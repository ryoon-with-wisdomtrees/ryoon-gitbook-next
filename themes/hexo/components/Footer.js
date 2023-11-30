import { siteConfig } from '@/lib/config'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const copyrightDate =
    parseInt(since) < currentYear ? since + '-' + currentYear : currentYear

  return (
    <footer className="relative z-10 dark:bg-black flex-shrink-0 bg-hexo-light-gray justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm p-6">
      {/* <DarkModeButton/> */}
      <i className="fas fa-copyright" /> {`${copyrightDate}`}{' '}
      <span>
        <i className="mx-1 animate-pulse fas fa-heart" />{' '}
        <a
          href={siteConfig('LINK')}
          className="underline font-bold  dark:text-gray-300 "
        >
          {siteConfig('AUTHOR')}
        </a>
        .<br />
        <h1 className="text-xs pt-4 text-light-400 dark:text-gray-400">
          {title} {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
        </h1>
        <p className="text-xs pt-2 text-light-500 dark:text-gray-500">
          Powered by{' '}
          <a
            href="https://github.com/tangly1024/NotionNext"
            className="dark:text-gray-300"
          >
            NotionNext {siteConfig('VERSION')}
          </a>
          .
        </p>
        <p className="text-xs pt-2 text-light-500 dark:text-gray-500">
          Customized by{' '}
          <a
            href="https://github.com/ryoon-with-wisdomtrees/RyoonLog"
            className="underline text-gray-500 dark:text-gray-300"
          >
            RyoonLog
          </a>
          .
        </p>
      </span>
      <br />
    </footer>
  )
}

export default Footer