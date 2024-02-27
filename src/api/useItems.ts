import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchItems = async (search: string) => {
  const { data } = await axios.get(`http://universities.hipolabs.com/search?country=Czech+Republic&name=${search}`);
  return data;
};

const useItems = (search: string) => {
  return useQuery({
      queryKey: ['items', search],
      queryFn: () => fetchItems(search),
    }
  );
};

export default useItems;