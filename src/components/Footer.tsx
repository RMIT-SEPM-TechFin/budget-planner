import { cn } from '@/lib/utils';
const Footer = () => {
  return (
    <footer className="border-t border-gray-500">
          <p className="text-sm px-10 py-5 text-gray-500">
            &copy; {new Date().getFullYear()} RMIT TechFin Group
          </p>
      </footer>
  );
};

export default Footer;
