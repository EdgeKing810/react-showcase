export const FullAbsoluteContainer = ({
  additional,
  additionalIn,
  children,
  theme,
  outFunction,
  height,
  moreAdditional,
}) => (
  <div
    className={`w-screen ${additional} lg:h-full h-screen top-0 ${
      !additional.includes('z-') && 'z-20'
    } fixed transform ease-in-out duration-400`}
    onKeyPress={(e) => e.key === 'Escape' && outFunction()}
  >
    <div
      className={`bg-main-${
        theme === 'light' ? '100' : '900'
      } opacity-95 w-full h-full px-2 lg:px-0 ${additionalIn}`}
    >
      <div
        className={`${
          moreAdditional ? moreAdditional : `${additionalIn} w-full`
        }`}
      >
        {children}
      </div>
    </div>
  </div>
);
