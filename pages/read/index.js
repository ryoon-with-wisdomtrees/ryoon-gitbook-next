/* eslint-disable no-unused-vars */
import { getGlobalData } from '@/lib/notion/getNotionData'
import { useEffect } from 'react'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { getLayoutByTheme } from '@/themes/theme'
import { isBrowser } from '@/lib/utils'
import { formatDateFmt } from '@/lib/formatDate'

const ReadandWriteIndex = props => {
  const { siteInfo } = props
  const { locale } = useGlobal()
  // console.log('siteInfo', siteInfo)
  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter())

  const meta = {
    title: `${locale.NAV.READ} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: 'read',
    type: 'website'
  }

  useEffect(() => {
    if (isBrowser) {
      const anchor = window.location.hash
      if (anchor) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchor.substring(1))
          if (anchorElement) {
            anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
          }
        }, 300)
      }
    }
  }, [])

  props = { ...props, meta }

  return <Layout {...props} />
}

// export async function getStaticProps() {
//   const from = 'read-index-props'
//   const props = await getGlobalData({ from: from, type: 'Read' })
//   delete props.allPages
//   return {
//     props,
//     revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
//   }
// }

export async function getStaticProps() {
  const from = 'read-index'
  const props = await getGlobalData({ from: from, type: 'Read' })

  props.readPosts = props.allPages?.filter(
    page => page.type === 'Read' && page.status === 'Published'
  )

  // console.log('readPosts: ', props.readPosts)
  const postsSortByDate = Object.create(props.readPosts)

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate
  })

  const readAndWritePosts = {}

  postsSortByDate.forEach(post => {
    const date = formatDateFmt(post.publishDate, 'yyyy-MM')
    if (readAndWritePosts[date]) {
      readAndWritePosts[date].push(post)
    } else {
      readAndWritePosts[date] = [post]
    }
  })

  props.readAndWritePosts = readAndWritePosts
  delete props.allPages

  //   console.log(' props.readAndWritePosts', props.readAndWritePosts)
  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default ReadandWriteIndex
