export const natsWrapper = {
  //   client: {
  //     publish: (subject: string, data: string, callback: () => void) => {
  //       console.log("Call HERE");

  //       callback();
  //     },
  //   },
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
