import { Autocomplete } from '@mantine/core';

export function AutoComplete({dataplaces}) {
  return (
    <Autocomplete
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={dataplaces}
    />
  );
}