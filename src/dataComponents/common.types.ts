import React from "react";

export interface DataComponentCommonProps<T> {
  render: (data: T) => React.ReactElement;
  renderLoading?: () => React.ReactElement;
}
