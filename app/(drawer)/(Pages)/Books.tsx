import Background from '~/components/Background';
import Lexical from './../../../components/Reusebales/Lexical';

const Books = () => {
  return (
    <Background>
      <Lexical
        initialHtml={
          '<p class="mb-1" style="text-align: right;"><span style="white-space: pre-wrap;">sddddddddddd</span></p><p class="mb-1" style="text-align: right;"><br></p><p class="mb-1" style="text-align: right;"><br></p><p class="mb-1" style="text-align: right;"><br></p><p class="mb-1" style="text-align: right;"><br></p><p class="mb-1" style="text-align: right;"><br></p><p class="mb-1" style="text-align: right;"><br></p><p class="mb-1" style="text-align: right;"><span style="white-space: pre-wrap;">sdsdsssdccccxcxc</span><u><span class="underline" style="white-space: pre-wrap;">ccccxcxcxcx</span></u><u><mark style="white-space: pre-wrap;"><span class="bg-yellow-200 underline">xcxcx</span></mark></u><u><b><mark style="white-space: pre-wrap;"><strong class="font-bold bg-yellow-200 underline">xcxcxc</strong></mark></b></u><u><i><b><mark style="white-space: pre-wrap;"><strong class="font-bold bg-yellow-200 italic underline">ccccc</strong></mark></b></i></u><u><i><b><code spellcheck="false" style="white-space: pre-wrap;"><strong class="font-bold bg-gray-200 px-1 py-0.5 font-mono text-sm rounded bg-yellow-200 italic underline">xcxcxcxc</strong></code></b></i></u></p>'
        }
        onStateChange={({ html }) => console.log(html)}></Lexical>{' '}
    </Background>
  );
};

export default Books;
