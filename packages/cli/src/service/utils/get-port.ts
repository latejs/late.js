import portfinder from 'portfinder';

interface PortType {
  port?: number | string;
  stopPort?: number | string;
}
const getPort = ({ port, stopPort }: PortType = {}): Promise<number> => {
  return new Promise((resolve, reject) => {
    portfinder.getPort(
      {
        port: port as number,
        stopPort: (stopPort as number) || 9999,
      },
      async (err, port) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(port);
      },
    );
  });
};
export { getPort };
