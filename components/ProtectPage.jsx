"use clients";
import useProtected from "@/hook/useProtected";
import { Flex, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
export default function ProtectedPage({
  accessMenu = "false",
  permission,
  children,
}) {
  const { access } = useProtected(accessMenu, permission);

  if (access) {
    return <>{children}</>;
  } else {
    return (
      <Flex
        h="100%"
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        overflow={"hidden"}
        w={"100%"}
      >
        <Heading color={"red"}>
          Anda Tidak Memiliki Acces ke Halaman ini
        </Heading>
      </Flex>
    );
  }
}

ProtectedPage.propTypes = {
  permission: PropTypes.string.isRequired,
  accessMenu: PropTypes.string.isRequired,
};