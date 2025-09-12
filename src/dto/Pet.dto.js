export default class PetDto {
    static getPetInputFrom = (pet) => {
        return {
            name: pet.name||'',
            specie:pet.specie||'',
            image: pet.image||'',
            birthdate: pet.birthdate||'',
            adopted:false
        }
    }
}