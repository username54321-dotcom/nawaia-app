export const theme = {
  // Theme styling goes here
  ltr: 'text-left',
  rtl: 'text-right',
  paragraph: 'mb-1',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline', // This is the key change
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-gray-200 px-1 py-0.5 font-mono text-sm rounded',
    highlight: 'bg-yellow-200', // Example for your highlight button
  },
  // You can also style other nodes like headings, links, etc.
  heading: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
  },
  link: 'text-blue-500 hover:underline',
};

export default theme;
