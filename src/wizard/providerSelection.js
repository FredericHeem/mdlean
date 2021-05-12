/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { observer } from "mobx-react";
import button from "../button";

import { ReactComponent as AwsLogo } from "./assets/aws.svg";
import { ReactComponent as GcpLogo } from "./assets/gcp.svg";
import { ReactComponent as AzureLogo } from "./assets/azure.svg";

export default function (context) {
  const Button = button(context);

  return observer(({ store }) => (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        > button {
          margin: 1rem;
          padding: 1rem;
          width: 30rem;
        }
      `}
    >
      <Button raised onClick={() => store.selectProvider("AWS")}>
        <AwsLogo />
      </Button>
      <Button raised onClick={() => store.selectProvider("GCP")}>
        <GcpLogo />
      </Button>
      <Button raised onClick={() => store.selectProvider("Azure")}>
        <AzureLogo />
      </Button>
    </div>
  ));
}
