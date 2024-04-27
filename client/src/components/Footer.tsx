import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className="bg-transparent text-white py-4 h-[20vh] text-lg border-t border-gray-500 mt-5">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div  className='flex flex-col gap-2'>
          <p className="text-gray-400 text-sm">Inspired by the design of <strong>Spotify</strong></p>
          <p className="text-gray-400 text-sm">Songs data provided by <a href="https://saavn.dev/" target='_blank' className="underline">Open Source Songs API</a></p>
        </div>
        <div className='flex flex-col gap-2'>
          <p>Made with ❤️ by <strong className="text-green-400">Bheema</strong></p>
          <p className="text-gray-400 text-sm">Check out my portfolio <a href="https://bheemaraya.onrender.com/"  target='_blank' className="underline text-blue-500">here</a></p>
         <div>
         <a href="https://github.com/BheemuUppar" target='_blank' className="text-gray-400 hover:text-white ml-4"><GitHubIcon/></a>
          <a href="https://www.linkedin.com/in/bheemarayaa/" target='_blank'  className="text-gray-400 hover:text-white ml-4"><LinkedInIcon/></a>
          <a href="https://www.instagram.com/bheemu_rocky/" target='_blank' className="text-gray-400 hover:text-white ml-4" ><InstagramIcon/></a>
         </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
