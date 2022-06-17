import { userCookieName } from "./../../config/localStorage";
import { useLocalStorage } from "../../utils/useLocalStorage";
import { request } from "../api";

export const getRecommendSongs = (callback: RequestCallBack) => {
	let cookie = useLocalStorage()[userCookieName];
	return request(`/recommend/songs?cookie=${cookie}`, callback);
};
