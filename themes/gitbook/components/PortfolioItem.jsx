/* eslint-disable no-unused-vars */
import { siteConfig } from '@/lib/config'
import Image from 'next/image'
import Link from 'next/link'
import CONFIG from '../config'
import { PortfolioCardInfo } from './PortfolioCardInfo'
import LazyImage from '@/components/LazyImage'

export default function PortfolioItem({ pIndex, pId, pTitle, pPosts }) {
  // console.log('pPosts', pPosts)
  const showPreview = false
  // const showPageCover = pPosts?.pageCoverThumbnail && !showPreview
  const showPageCover = pPosts?.pageCoverThumbnail
  return (
    <div key={pIndex} className="w-full">
      {/* <div id={pId} className=" pb-4 text-2xl dark:text-gray-300">
        {pTitle}
      </div> */}
      <div className="hover:scale-110 transition-all duration-150">
        <div
          key={pId}
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
          data-aos-duration="800"
          data-aos-once="false"
          data-aos-anchor-placement="top-bottom"
          id="blog-post-card"
          className={`group md:h-56 w-full flex justify-between md:flex-row flex-col-reverse ${
            pIndex % 2 === 1 ? 'md:flex-row-reverse' : ''
          }overflow-hidden border dark:border-black rounded-xl bg-white dark:bg-hexo-black-gray`}
        >
          {/* Text content */}
          <PortfolioCardInfo
            index={pIndex}
            post={pPosts}
            showPageCover={showPageCover}
            showPreview={showPreview}
            showSummary={true}
          />

          {/* Picture cover */}
          {showPageCover && (
            <div className="md:w-5/12 overflow-hidden">
              <Link href={`article/${pPosts.slug}`} passHref legacyBehavior>
                <LazyImage
                  priority={pIndex === 1}
                  src={pPosts?.pageCoverThumbnail}
                  className="h-56 w-full object-cover object-center group-hover:scale-110 duration-500"
                />
                {/* <Image
                  src={pPosts?.pageCoverThumbnail}
                  width={400}
                  height={400}
                  className="h-56 w-full object-cover object-center group-hover:scale-110 duration-500"
                /> */}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
