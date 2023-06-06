import getConfig from 'next/config';

const { buildTimeStamp } = getConfig().publicRuntimeConfig || {};

const BuildTimeStamp = () => {
  if (!buildTimeStamp) return null;
  return (
    <p className="text-gray-400 text-sm text-center lg:text-start">
      Built time: {new Date(buildTimeStamp).toLocaleString()}
    </p>
  );
};

export default BuildTimeStamp;
