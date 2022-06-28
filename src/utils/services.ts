import { auth, db } from './firebase';
import { collection, getDocs, query, addDoc, orderBy, setDoc, doc } from '@firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { Movie } from './types';

const movies = collection(db, 'movies');

export const getYoutubeId = (url: string) => {
  let ID: string | string[] = '';
  const parsedUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (parsedUrl[2] !== undefined) {
    return parsedUrl[2].split(/[^0-9a-z_-]/i)[0];
  }
  return ID;
};

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

export const updateMovieService = (movie: Movie) => {
  const { id, ...data } = movie;
  return setDoc(doc(db, 'movies', id), data, { merge: true });
};

const register = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert('Login failed, check your credentials');
  }
};

export const loginRegister = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    const { message } = error;
    if (message && message.includes('auth/user-not-found')) {
      await register(email, password);
    } else {
      alert('Login failed, check your credentials');
    }
  }
};

export const fetchVideoInformation = async (url: string) => {
  try {
    const id = getYoutubeId(url);
    if (!id) return null;
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&id=${id}`
    );
    const result = await data.json();
    if (!result.items || !result.items.length) {
      return null;
    }
    return result;
  } catch (error) {
    console.log('error', error);
  }
};

export const logOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
