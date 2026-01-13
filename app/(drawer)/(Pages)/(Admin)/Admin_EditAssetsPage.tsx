import Background from '~/components/Background';
import { useLocalSearchParams, Head } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseClient } from '~/utils/supabase';
import AdminUpdateField from '~/components/Pages/AdminPage/AdminUpdateField';
import FadeIn from '~/components/Animations/FadeIn';
import LoadingAnimation from '~/components/Reusebales/LoadingAnimation';
import { Database } from '~/utils/database.types';

type TableName = keyof Database['public']['Tables'];
type paramTypes = {
  id: string;
  table: TableName;
  fieldName: keyof Database['public']['Tables']['public_assets']['Row'];
  label: string;
};
const Admin_EditAssetsPage = () => {
  const queryClient = useQueryClient();
  const { id, table, fieldName, label }: paramTypes = useLocalSearchParams();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['edit assets', id, table, fieldName],
    queryFn: async () => {
      const { data } = await supabaseClient
        .from(table)
        .select(fieldName as string)
        .eq('id', +id);

      return data;
    },
  });
  const handleRefetch = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['public_assets'] });
  };
  return (
    <>
      <Background>
        <LoadingAnimation show={isLoading}></LoadingAnimation>
        {data && (
          <>
            <FadeIn>
              <AdminUpdateField
                fieldName={fieldName as string}
                id={+id}
                label={label as string}
                liveValue={data[0][fieldName]}
                table={table}
                refetch={handleRefetch}></AdminUpdateField>
            </FadeIn>
          </>
        )}
      </Background>
    </>
  );
};

export default Admin_EditAssetsPage;
