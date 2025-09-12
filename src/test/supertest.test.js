import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import config from "../src/config/config.js";
import mongoose, { isValidObjectId } from "mongoose"

const requester=supertest(`http://localhost:${config.PORT}`)

await mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})

describe("Pruebas router pets", function(){
    this.timeout(10_000)

    after(async()=>{
        await mongoose.connection.collection("pets").deleteMany({specie:"test"})
    })

    it("debería devolver un array de mascotas", async() => {
        let {body} = await requester.get("/api/pets").send()
        expect(Array(body.payload))
    })    

    it("deberia dar de alta la mascota en DB", async()=>{
        let petMock={
            name: "Rocky", 
            specie: "test", 
            birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status, body}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(200)
        expect(body.payload).to.has.property("_id")
        expect(isValidObjectId(body.payload._id)).to.be.true
    })

    it("debería dar error el nombre", async()=>{
        let petMock={
            //name: "Rocky", 
            specie: "test", 
            birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(400)
    })    

    it("debería dar error la especie", async()=>{
        let petMock={
            name: "Rocky", 
            //specie: "test", 
            birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(400)
    })        
    
    it("debería dar error la fdn", async()=>{
        let petMock={
            name: "Rocky", 
            specie: "test", 
            //birthDate: new Date(2025, 11, 18).toUTCString()
        }

        let {status}=await requester.post("/api/pets").send(petMock)
        expect(status).to.be.eq(400)
    })        
    
})

describe("Prueba router users", function(){
    this.timeout(10_000) // 2.000 ms

    it("debería devolver array de usuarios", async() => {
        let {body} = await requester.get("/api/users").send()
        expect(Array(body.payload))
    })        

    it("deberia dar de alta un usuario y una mascota en DB", async() => {

        let {status, body}=await requester.post(`/api/mocks/generateData`).send()
        expect(status).to.be.eq(201)
        expect(Array(body))
        expect(body.message).to.be.eq("Datos generados exitosamente!")
    })

    it("deberia dar de alta los usuarios y las mascotas solicitados en DB", async() => {

        let usuarios=3
        let mascotas=3

        let {status, body}=await requester.post(`/api/mocks/generateData/?user=${usuarios}&pets=${mascotas}`).send()
        expect(status).to.be.eq(201)
        expect(Array(body))
        expect(body.message).to.be.eq("Datos generados exitosamente!")
    })    
    
    it("deberia dar error de usuario", async() => {
        let user = -1
        let {status}=await requester.post(`/api/mocks/generateData/?user=${user}`).send()
        expect(status).to.be.eq(400)
    })    

    it("deberia dar error de mascota", async() => {
        let pet = -1
        let {status}=await requester.post(`/api/mocks/generateData/?pet=${pet}`).send()
        expect(status).to.be.eq(400)
    })
})