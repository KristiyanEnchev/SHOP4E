import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="text-center py-8 px-4  bg-main-bg dark:bg-main-dark-bg">
      <p className="text-gray-500 mb-4">
        {new Date().getFullYear()} SHOP4E by{' '}
        <a
          href="https://kristiyan-enchev-website.web.app/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Kristiyan Enchev
        </a>
      </p>
      <div className="flex justify-center gap-4 text-2xl text-gray-500">
        <AiFillInstagram className="cursor-pointer hover:text-gray-800 transition-colors" />
        <AiOutlineTwitter className="cursor-pointer hover:text-gray-800 transition-colors" />
      </div>
    </div>
  );
};

export default Footer;
