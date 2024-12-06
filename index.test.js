const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

test('[0] sanity check', () => {
    expect(true).toBe(true)
})
describe('Server Tests', () => {
    test('[1] get all movies', async () => {
        const res = await request(server).get('/api/movies')
        expect(res.body).toHaveLength(3)
    })
    test('[2] get movie by id', async () => {
        const res = await request(server).get('/api/movies/7')
        expect(res.body).toStrictEqual([{
            "movie_id": 7,
            "movie_name": "The Chronicles of Narnia: The Lion, The Witch, and The Wardrobe",
            "release_year": 2005,
            "genre": "Fantasy"
          }])
    })
    test('[3] cannot get movie that does not exist', async () => {
        const res = await request(server).get('/api/movies/7')
        expect(res.body).toStrictEqual({message: "Movie not found."})
    })
    test('[4] can create movie', async () => {
        const res = await request(server).post('/api/movies').send({movie_name: "Testing"})
        expect(res.body).toStrictEqual([{
            "movie_id": 16,
            "movie_name": "Testing",
            "release_year": null,
            "genre": null
          }])
    })
    test('[5] movie requires a movie name', async () => {
        const res = await request(server).post('/api/movies').send({movie_name: "", release_year: 2000, genre: "Action"})
        expect(res.body).toStrictEqual({message: "Movie requires a Name."})
    })
    test('[6] movie release year number be an integer', async () => {
        const res = await request(server).post('/api/movies').send({movie_name: "Testing", release_year: "2000", genre: "Action"})
        expect(res.body).toStrictEqual({message: "Movie release year is not a number."})
    })
    test('[7] can update movie', async () => {
        const res = await request(server).put('/api/movies/23').send({movie_name: "Testing", release_year: 2000, genre: "Action"})
        expect(res.body).toStrictEqual([{
            "movie_id": 23,
            "movie_name": "Testing",
            "release_year": 2000,
            "genre": "Action"
          }])
    })
    test('[8] updated movie requires movie name and release date to be an integer', async () => {
        let res = await request(server).put('/api/movies/26').send({movie_name: "", release_year: 2000, genre: "Action"})
        expect(res.body).toStrictEqual({message: "Movie requires a Name."})
        res = await request(server).put('/api/movies/26').send({movie_name: "Testing", release_year: "2000", genre: "Action"})
        expect(res.body).toStrictEqual({message: "Movie release year is not a number."})
    })
    test('[9] can delete movie', async () => {
        await request(server).delete('/api/movies/29')
        const res = await request(server).get('/api/movies')
        expect(res.body).toHaveLength(2)
    })
    test('[10] responds with 404 page not found for any unhandled endpoints', async () => {
        let res = await request(server).get('/asd')
        expect(res.body).toStrictEqual({message: "Page not found."})
        expect(res.status).toBe(404)
    })
})