import PropTypes from "prop-types";
import { LANGUAGES } from "../../utils/presets";

function Translation({
  textElement,
  toLanguage,
  translating,
  setToLanguage,
  generaTranslation,
}) {
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      {!translating && (
        <div className=" flex flex-col gap-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">
            To Language
          </p>
          <div className="flex items-stretch gap-2">
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="flex-1 outline-none bg-white focus:outline border border-solid border-transparent hover:border-blue-300 duration-200 p-2 px-3 rounded"
            >
              <option value={"Select Language"}>Select Language</option>
              {Object.entries(LANGUAGES).map(([val, index]) => {
                return (
                  <option key={index} value={val}>
                    {index}
                  </option>
                );
              })}
            </select>
            <button
              onClick={generaTranslation}
              className="specialBtn px-3 py-2 rounded-lg text-blue-200 hover:text-blue-600 duration-200"
            >
              Translate
            </button>
          </div>
        </div>
      )}

      {textElement && !translating && <p>{textElement}</p>}
      {translating && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
    </div>
  );
}

Translation.propTypes = {
  translation: PropTypes.text,
  textElement: PropTypes.text,
  toLanguage: PropTypes.text,
  translating: PropTypes.bool,
  setTranslation: PropTypes.func,
  setTranslating: PropTypes.func,
  setToLanguage: PropTypes.func,
  generaTranslation: PropTypes.func,
};
export default Translation;
