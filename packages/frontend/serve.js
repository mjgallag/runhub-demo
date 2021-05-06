const express = require('express');

const frontend = express();
const port = process.env.PORT;

frontend.use(
  express.static('build', {
    setHeaders: function (res, path) {
      if (path.startsWith(`${process.cwd()}/build/static/`)) {
        res.set('Cache-Control', 'max-age=31536000');
      } else {
        res.set('Cache-Control', 'no-cache');
      }
    },
  })
);

frontend.listen(port, () => {
  console.log(`frontend listening at http://localhost:${port}`);
});
