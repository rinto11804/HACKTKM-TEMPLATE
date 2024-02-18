import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme";
import Providers from "./providers";
import { Raleway } from 'next/font/google'
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';


export const metadata = {
  title: "Enrut",
  description: "Smart supply chain system that ensures transparency and authenticity",
};
const urbanist = Raleway({
  preload: false,
})
export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link
          rel="icon"
          href="/enrut-dark.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/enrut-light.svg"
          media="(prefers-color-scheme: dark)"
        />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={urbanist.className}>
        <Providers>
          <MantineProvider theme={theme}><Notifications />{children}</MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
