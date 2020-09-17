exports.seed =  async function(knex) {
  await knex('manufacturers').insert([
    {
      manufacturer_name: 'Mars',
      desc: "Manufacturer who manufacturs pet food and other food products, and a provider of animal care"
    },
    {
      manufacturer_name: 'Ferrero SpA',
      desc: "known as Ferrero Group, is an Italian manufacturer of branded chocolate and confectionery products and it is the second biggest chocolate producer and confectionery company in the world."
    }
  ])
}
