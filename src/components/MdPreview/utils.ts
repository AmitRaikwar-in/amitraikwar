import { isEmpty } from 'lodash';

/**
 * Function to fetch the markdown string data from the path.
 * @param path Path of the markdown file.
 * @param responseHandler Function to handle the response.
 * @returns
 */
export const getMdFileDataInString = (
  path: string,
  responseHandler: (dataString: string) => void,
) => {
  if (isEmpty(path)) return;

  // Fetch the markdown file data.
  import(`../../${path}.md`)
    .then((res) => {
      fetch(res.default)
        .then((res) => {
          return res.text();
        })
        .then((res: string) => {
          responseHandler(res);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error));
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error));
};
