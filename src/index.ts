import env from "./env";
import app from "./app";

app.listen(env.PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${env.PORT}`);
});
