/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import button from "./button";
import fbIcon from "../icons/facebook.svg";

export default (context) => {
  const { tr } = context;
  const Button = button(context);

  return function ButtonExamples() {
    return (
      <section id="button">
        <h1>{tr.t("Button")}</h1>
        <form
          css={css`
            button {
              margin: 12px;
            }
          `}
        >
          <h3>Flat</h3>
          <p>
            <Button label="FLAT LABEL" />
            <Button primary>FLAT PRIMARY</Button>
            <Button accent>FLAT ACCENT</Button>
            <Button ripple label="RIPPLE FLAT" />
            <Button disabled label="disabled FLAT LABEL" />
          </p>
          <h3>Raised</h3>
          <p>
            <Button raised label="RAISED FLAT" />
            <Button raised primary>
              RAISED PRIMARY
            </Button>
            <Button raised accent>
              RAISED ACCENT
            </Button>
            <Button raised ripple label="RAISED RIPPLE" />
            <Button raised accent disabled>
              disabled RAISED ACCENT{" "}
            </Button>
          </p>
          <h3>Primary</h3>
          <p>
            <Button primary>PRIMARY</Button>
            <Button primary raised>
              PRIMARY RAISED
            </Button>
            <Button primary ripple raised>
              primary RIPPLE RAISED
            </Button>
            <Button primary disabled>
              primary disabled
            </Button>
          </p>
          <h3>Ripple</h3>
          <p>
            <Button ripple raised>
              RIPPLE RAISED
            </Button>
            <Button ripple raised primary>
              RIPPLE RAISED PRIMARY
            </Button>
            <Button ripple raised accent>
              RIPPLE RAISED ACCENT
            </Button>
            <Button ripple raised accent disabled>
              RIPPLE RAISED ACCENT disabled
            </Button>
          </p>
          <h3>Disabled</h3>
          <p>
            <Button disabled>disabled FLAT</Button>
            <Button disabled primary>
              disabled FLAT PRIMARY
            </Button>
            <Button disabled accent>
              disabled FLAT accent
            </Button>

            <Button disabled raised>
              disabled raised
            </Button>
            <Button disabled raised primary>
              disabled RAISED PRIMARY
            </Button>
            <Button disabled raised accent>
              disabled RAISED accent
            </Button>
          </p>
          <h3>Full Width</h3>
          <p>
            <Button fullWidth raised label="fullwidth raised" />
            <Button fullWidth primary label="fullwidth  primary" />
          </p>
          <h3>Full Width</h3>
          <p>
            <Button
              raised
              icon={<img src={fbIcon} width="20" alt="fb" />}
              label="With Icon"
            />
            <Button
              style={{
                width: 350,
                background: "#4267b2",
                color: "white",
              }}
              raised
              icon={
                <img
                  style={{ backgroundColor: "white" }}
                  src={fbIcon}
                  width="20"
                  alt="with icon"
                />
              }
              label="With Icon"
            />
            <Button
              raised
              icon={<img src={fbIcon} height="80" alt="with Tall icon" />}
              label="With Tall Icon"
            />
          </p>
        </form>
      </section>
    );
  };
};
