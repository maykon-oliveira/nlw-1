import app from './src/app';

export const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log('App started up');
});
