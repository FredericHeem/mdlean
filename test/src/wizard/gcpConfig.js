/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import button from "../button";
import fileInput from "../fileInput";
import { ReactComponent as IconUpload } from "../fileInput/uploadIcon.svg";

const gcpConfig = (context) => {
  const {
    tr,
    emitter,
    theme: { palette },
  } = context;
  const Button = button(context);
  const FileInput = fileInput(context);
  const store = observable({
    fileName: "",
    projectName: "",
    content: {},
    error: "",
    nextStep: () => {
      emitter.emit("step.select", "Scan");
    },
    setProjectName: (projectName) => {
      store.projectName = projectName;
    },
    get() {
      return store.projectName.length === 0;
    },
    get isDisabled() {
      return !store.content.project_id;
    },
    onChangeFile: (event) => {
      const file = event.target.files[0];
      if (file) {
        store.fileName = file.name;

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          try {
            store.content = JSON.parse(reader.result);
          } catch (error) {
            //TODO display error
            store.error = "Error parsing file";
          }
        };

        reader.onerror = () => {
          //TODO display error
          console.log(reader.error);
        };
      } else {
        store.input = "";
      }
    },
  });

  const FileInputLabel = ({}) => (
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
      ]}
    >
      <IconUpload />
      <span>{tr.t("Choose a credential file to upload")}</span>
    </div>
  );

  const CredentialFile = ({ fileName, content }) => (
    <table
      css={css`
        border-collapse: collapse;
        td,
        th {
          border: 1px solid ${palette.grey[500]};
          padding: 0.5rem;
          text-align: left;
        }
      `}
    >
      <tbody>
        <tr>
          <th>Credential File</th> <td>{fileName}</td>
        </tr>
        <tr>
          <th>Project Name</th> <td>{content.project_id}</td>
        </tr>
        <tr>
          <th>Service Account</th> <td>{content.client_email}</td>
        </tr>
      </tbody>
    </table>
  );

  return observer(() => (
    <form
      css={css`
        main {
          section {
            box-shadow: none;
          }
          margin: 1rem 0;
        }
        footer {
          button {
            margin: 1rem;
          }
        }
      `}
    >
      <main>
        <p>
          GruCloud requires a read-only service account to scan a project's
          architecture. Please select the service account credential JSON file
          for the project that will be scanned. Follow the following steps to
          create and upload this file.
        </p>
        <ol
          css={css`
            > li {
              padding: 0.3rem 0;
            }
          `}
        >
          <li>
            <span>Visit the </span>
            <a
              href="https://console.cloud.google.com/iam-admin/serviceaccounts"
              target="_blank"
            >
              service account page
            </a>{" "}
            on the google cloud console
          </li>
          <li>Select your project</li>
          <li>
            Click on <em>CREATE SERVICE ACCOUNT</em>
          </li>
          <li>
            Set the <em>Service account name</em> to 'grucloud' for instance
          </li>
          <li>
            Click on <em>CREATE</em>
          </li>
          <li>Select the basic role 'Viewer'</li>
          <li>
            Click on <em>CONTINUE</em>
          </li>
          <li>
            Click on <em>DONE</em>
          </li>
          <li>
            Go to the <em>Actions</em> column, click on the three dot icon of
            the newly created service account
          </li>
          <li>
            Click on <em>Manage keys</em>
          </li>
          <li>
            Click on <em>ADD KEYS</em>, then <em>Create new key</em>
          </li>
          <li>
            Click on <em>CREATE</em> to download the credential file in JSON
            format.
          </li>
        </ol>
        <FileInput
          cssOverride={css`
            .filename-display {
              display: none;
            }
          `}
          component={<FileInputLabel />}
          name="file"
          accept="application/JSON"
          onChange={(evt) => store.onChangeFile(evt)}
        />

        {!store.isDisabled && (
          <CredentialFile fileName={store.fileName} content={store.content} />
        )}
      </main>
      <footer>
        <Button
          onClick={() => emitter.emit("step.select", "ProviderSelection")}
        >
          {"\u25c0"} Back
        </Button>
        <Button
          disabled={store.isDisabled}
          raised
          primary
          onClick={() => store.nextStep()}
        >
          Save and Scan {store.content.project_id}
        </Button>
      </footer>
    </form>
  ));
};

export default gcpConfig;
