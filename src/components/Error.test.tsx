import { render, screen } from "@testing-library/react";

import { Error } from "./Error";

describe("Test components/Error", () => {
  it("Should match snapshot", () => {
    const view = render(
      <Error error={{ error: "foo", status: "CUSTOM_ERROR" }} />
    );
    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fade alert alert-danger show"
          role="alert"
        >
          There has been an error, please reach out to support with the following information:
          <br />
          {"error":"foo","status":"CUSTOM_ERROR"}
        </div>
      </div>
    `);
  });
});
