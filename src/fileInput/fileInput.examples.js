/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import fileInput from "./fileInput";
import { ReactComponent as IconUpload } from "./uploadIcon.svg";
export default (context) => {
  const {
    tr,
    theme: { palette },
  } = context;

  const store = observable({
    input: "",
    upload: () => {},
  });

  const FileInput = fileInput(context);

  const FileInputLabel = ({ disabled }) => (
    <div
      css={[
        css`
          display: flex;
          align-items: center;
          flex-direction: column;
          color: ${palette.text.primary};
          > * {
            margin: 1rem;
          }
          svg {
            height: 3rem;
            path {
              fill: ${palette.text.primary};
            }
          }
        `,
        disabled &&
          css`
            color: ${palette.grey[500]};
            svg {
              path {
                fill: ${palette.grey[500]};
              }
            }
          `,
      ]}
    >
      <IconUpload />
      <span>{tr.t("Choose a file to upload")}</span>
    </div>
  );

  return observer(function FileInputExamples() {
    return (
      <section id="file-input">
        <h1>{tr.t("File Input")}</h1>
        <form
          css={css`
            > div {
              margin: 10px;
            }
          `}
        >
          <h2>{tr.t("File Input Single file")}</h2>
          <FileInput
            component={<FileInputLabel />}
            name="file"
            accept="text/*"
            onChange={(evt) => {
              const file = evt.target.files[0];
              if (file) {
                store.input = file.name;
              } else {
                store.input = "";
              }
            }}
          />
          <h2>{tr.t("File Input Disabled")}</h2>
          <FileInput
            disabled
            component={<FileInputLabel disabled />}
            name="file"
            accept="text/*"
          />
        </form>
      </section>
    );
  });
};
