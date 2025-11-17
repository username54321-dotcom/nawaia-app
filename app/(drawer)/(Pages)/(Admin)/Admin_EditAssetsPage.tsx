import Background from '~/components/Background';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import AdminUpdateField from '~/components/Pages/AdminPage/AdminUpdateField';

const Admin_EditAssetsPage = () => {
  const { id, table, fieldName, label } = useLocalSearchParams();
  console.log();
  const { data, refetch } = useQuery({
    queryKey: ['edit assets', id, table, fieldName],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(table)
        .select(fieldName as string)
        .eq('id', +id);

      return data;
    },
  });
  console.log(data);
  return (
    <>
      <Background>
        {data && (
          <>
            <AdminUpdateField
              fieldName={fieldName as string}
              id={+id}
              label={label as string}
              liveValue={data[0][fieldName]}
              table={table}
              refetch={refetch}></AdminUpdateField>
          </>
        )}
      </Background>
    </>
  );
};

export default Admin_EditAssetsPage;
