export const VerifyUsername = (
  text: string,
  setError: (error: any) => void,
  setValue: (value: string | null) => void
) => {
  //Is Not Empty
  const isNotEmpty = text.length > 0;
  isNotEmpty && setError(null);
  !isNotEmpty && setError('UserName is Required') && setValue(null);
  // Is Not Short
  const isNotShort = text.length >= 3;
  !isNotShort && setError('text is short') && setValue(null);
  isNotShort && setError(null);
  // No Special Characters
  const Regex = /[,\.:\(\)"\\{}\|\^~\[\]`]/;
  const isClean = !Regex.test(text);
  !isClean && setError('Cant Contain Special Characters') && setValue(null);
  isClean && setError(null);
  // Is Not Long
  const isNotLong = text.length < 30;
  !isNotLong && setError('Username Too Long') && setValue(null);
  isNotLong && setError(null);
  // Set Value
  isClean && isNotLong && isNotShort && setValue(text) && setError(null);
};
