import { db } from './firebase';
import { collection, getDocs, query, addDoc, orderBy } from '@firebase/firestore';

const movies = collection(db, 'movies');
console.log('movies :', movies);

export const getMovies = async () => {
  try {
    const q = query(movies, orderBy('createdTime', 'desc'));
    const querySnapshot = await getDocs(q);
    const data: any = [];

    querySnapshot.forEach(async (doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return data;
  } catch (error) {
    return [];
  }
};

export const shareMovie = (data: any) => {
  return addDoc(movies, {
    ...data,
    createdTime: new Date().toISOString()
  });
};
