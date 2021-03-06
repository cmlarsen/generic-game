import EventEmmiter from 'events'
import Inventory from './inventory/Inventory'
import Equipment from './equipment/Equipment'
import Characteristics from './characteristics/Characteristics'
import Battle from './battle/Battle'
import Status from './status/Status'
import Bank from './bank/Bank'
import Identity from './identity/Identity'
import Experience from './experience/Experience'
import Quests from './quests/Quests'
import Role from './role/Role'

class Character {
  constructor ({identity = {}, experience = 0, role = {}, items = [], equipment = {}, bank = {}, characteristics = [], inventory = {}}) {
    this.identity = new Identity(identity, role)
    this.events = new EventEmmiter()
    this.inventory = new Inventory(inventory)
    this.role = new Role(role)
    this.equipment = new Equipment(equipment)
    this.characteristics = new Characteristics({characteristics})
    this.battle = new Battle({character: this})
    this.status = new Status({character: this})
    this.bank = new Bank(bank)
    this.experience = new Experience({value: experience})
    this.quests = new Quests()

    this.identity.setRole(this.role.getName())
  }
  interact (thing) {
    return thing.interaction(this)
  }
  getLevel () {
    return this.experience.computeLevel()
  }
}

export default Character
