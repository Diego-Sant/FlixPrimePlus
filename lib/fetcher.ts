import axios from "axios";

// O axios pega o url e caso der tudo certo, retorna res.data
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;