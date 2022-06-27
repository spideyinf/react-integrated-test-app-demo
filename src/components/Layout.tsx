import { Header } from './Header';

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  return (
    <div className="container mx-auto max-w-screen-2xl min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-6">{props.children}</div>
    </div>
  );
};
