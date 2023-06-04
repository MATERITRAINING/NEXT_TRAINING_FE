"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "@/module/dashboard/Card";

import useStore from "@/store/useAuthStore";
import dayjs from "dayjs";
import ChartBar from "@/module/dashboard/Bar";
import ChartDonat from "@/module/dashboard/Donat";
import ChartLine from "@/module/dashboard/Line";
import Map from "@/module/dashboard/Map";
const Dashboard = () => {
  const setIncrement = useStore((state) => state.setIncrement);
  const user = useStore((state) => state.user);
  const role = useStore((state) => state.role);

  const { data: session } = useSession();
  console.log("berhjalan");
  return (
    <section className="h-full w-full overflow-auto p-5">
      <Grid
        h="100%"
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(6, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        templateRows="repeat(6, 1fr)"
        gap={5}
      >
        <GridItem
          h={{
            base: "50vh",
            md: "100%",
          }}
          colSpan={3}
          rowSpan={3}
        >
          <Map />
        </GridItem>
        <GridItem
          h={{
            base: "50vh",
            md: "100%",
          }}
          overflow={"scroll"}
          colSpan={3}
          rowSpan={3}
          color={"red"}
          borderRadius={10}
          shadow={"lg"}
          p={2}
        >
          <ChartDonat />
        </GridItem>

        <GridItem
          h={{
            base: "50vh",
            md: "100%",
          }}
          overflow={"scroll"}
          colSpan={3}
          rowSpan={3}
          color={"red"}
          borderRadius={10}
          shadow={"lg"}
          p={2}
        >
          <ChartBar />
        </GridItem>

        <GridItem
          h={{
            base: "50vh",
            md: "100%",
          }}
          overflow={"scroll"}
          colSpan={3}
          rowSpan={3}
          color={"red"}
          borderRadius={10}
          shadow={"lg"}
          p={2}
        >
          <ChartLine />
        </GridItem>
      </Grid>
    </section>
  );
};

export default Dashboard;
