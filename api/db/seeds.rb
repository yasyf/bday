# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def add_person!(name, email)
  first_name, last_name = name.split(' ')
  attrs = { email_address: email, first_name: first_name, last_name: last_name }
  if (found = Person.where(attrs.slice(:email_address)).or(Person.where(attrs.slice(:first_name, :last_name))).first)
    found.update! **attrs
  else
    Person.create! **attrs
  end
end

add_person! 'Yasyf Mohamedali', 'yasyfm@gmail.com'
add_person! 'Katie Ho', 'ksho@fb.com'
add_person! 'Athena Kan', 'athenakan1@gmail.com'
add_person! 'Kimberli Zhong', 'kimberlizhong@gmail.com'
add_person! 'Christine Hong', 'christine@apothecary.ai'
add_person! 'Christina Sun', 'christinasun5@gmail.com'
add_person! 'Kiran Wattamwar', 'k.keyrun@gmail.com'
add_person! 'Steph Zhang', 'szhang917@gmail.com'
add_person! 'Jenny Xu', 'xujennyc@gmail.com'
add_person! 'Nancy Hung', 'nancy.hung1068@gmail.com'
add_person! 'Sara Du', 'saradu@college.harvard.edu'
add_person! 'Serena Bian', 'serena@firstround.com'
add_person! 'Divya Shanmugam', 'divyashan@gmail.com'
add_person! 'Michael Shum', 'g.mmshum@gmail.com'
add_person! 'Bryan Cai', 'bryan.x.cai@gmail.com'
add_person! 'David Zhang', 'davidz948576@gmail.com'
add_person! 'Ava Huang', 'avahuangg@gmail.com'
add_person! 'Deepti Raghavan', 'deeptiraghavan18@gmail.com'
add_person! 'Dheev Arulmani', 'dheevesh@gmail.com'
add_person! 'Surya Bhupatiraju', 'surya95@gmail.com'
add_person! 'Jack Serrino', 'jserrino@gmail.com'
add_person! 'Rose Wang', 'rosezwang5@gmail.com'
add_person! 'Sho Gupta', 'shohini@dormroomfund.com'
add_person! 'Sophia Liu', 'sophliu95@gmail.com'
add_person! 'Parthi Loganathan', 'parthiban.loganathan.1@gmail.com'
add_person! 'Cathy Chen', 'cathy@portimmigration.com'
add_person! 'Lynn Takeshita', 'takeshitalynn@gmail.com'
add_person! 'Karine Hsu', 'karine.hsu.2012@gmail.com'
add_person! 'Rebca vandeVen', 'rebca.vandeven@gmail.com'
