import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const getDeliveryProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/delivery/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
