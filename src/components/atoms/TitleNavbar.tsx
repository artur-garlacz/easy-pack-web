type Props = {
  title: string;
};

export default function TitleNavbar({ title }: Props) {
  return (
    <nav className="w-full py-10 bg-gray-100">
      <h3 className="text-center font-semibold text-lg">{title}</h3>
    </nav>
  );
}
