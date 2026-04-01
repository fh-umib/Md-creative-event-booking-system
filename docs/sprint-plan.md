# Sprint 2 Plan — Flutura Hyseni

## Gjendja Aktuale

MD Creative – Smart Event & Booking Management System është një projekt full-stack i ndërtuar për menaxhimin e rezervimeve të eventeve, paketave të argëtimit, mascot characters, shërbimeve shtesë dhe koordinimit të stafit. Projekti synon të shndërrohet në një sistem të plotë, funksional dhe të përdorshëm në praktikë, jo vetëm në një demonstrim strukturor.

Në këtë fazë, projekti ka tashmë bazë të fortë teknike, organizim të qartë arkitekturor dhe dokumentim profesional.

### Çka funksionon tani?
Deri tani janë realizuar dhe organizuar këto pjesë kryesore:

- është krijuar repository kryesor i projektit me ndarje të qartë mes backend dhe frontend
- ekziston një frontend i ndërtuar me React, TypeScript dhe Vite
- ekziston një backend i ndërtuar me Node.js dhe Express
- është planifikuar dhe përdorur PostgreSQL si pjesë e stack-ut kryesor të backend-it
- backend-i është i organizuar me layered architecture
- projekti ka ndarje të qartë në:
  - `models`
  - `services`
  - `data`
  - `ui`
  - `utils`
- është ngritur Express server setup dhe konfigurimi bazë i aplikacionit
- janë krijuar themelet e authentication dhe booking service structure
- është organizuar repository layer
- është demonstruar Repository Pattern përmes:
  - `IRepository`
  - `FileRepository`
  - `FileBookingRepository`
- projekti përdor qasje hibride të persistence:
  - PostgreSQL repositories për logjikën kryesore të backend-it
  - CSV/file persistence për demonstrim të Repository Pattern
- projekti përmban dokumentim teknik në folderin `docs`
- dokumentimi aktual përfshin pjesë të arkitekturës, class diagram dhe materiale shpjeguese
- README është i strukturuar dhe e përshkruan qartë:
  - qëllimin e sistemit
  - features kryesore
  - planned system features
  - tech stack-un
  - project structure
  - backend architecture
  - repository pattern
  - current status

### Çka është përfunduar deri tani?
Bazuar në gjendjen aktuale të projektit, pjesët e përfunduara ose të ngritura qartë janë:

- backend project structure
- frontend project structure
- layered backend architecture
- Express server setup
- authentication and booking service structure
- repository layer organization
- Repository Pattern demonstration with CSV support
- UML documentation
- architecture documentation

### Çka nuk është përfunduar ende plotësisht?
Edhe pse projekti starton dhe ka bazë funksionale, ende ka disa pjesë që kërkojnë kompletim dhe stabilizim në nivel final:

- frontend UI duhet të rregullohet dhe të finalizohet më mirë
- integrimi frontend-backend duhet të përfundohet në rrjedhat kryesore
- authentication duhet të zgjerohet dhe të forcohet
- booking workflow duhet të bëhet i plotë nga fundi në fund
- database CRUD me PostgreSQL duhet të kompletohet
- validimet dhe error handling duhet të unifikohen në të gjitha shtresat
- modulet shtesë të biznesit dhe reporting duhet të avancohen
- unit tests ende nuk e mbulojnë nivelin e kërkuar për sprintin
- deploy publik për përdorim në pajisje të ndryshme ende nuk është bërë

### A kompajlohet dhe ekzekutohet programi?
- Po. Projekti starton pa problem, por ende nuk është full funksional në çdo modul dhe në çdo rrjedhë reale përdorimi.

---

## Plani i Sprintit

Qëllimi i Sprint 2 është që projekti të kalojë nga një bazë e mirë teknike dhe arkitekturore në një version shumë më të plotë, të integruar dhe të demonstrueshëm si sistem real.

Ky sprint do të fokusohet në një **feature kryesore end-to-end**, si dhe në disa përmirësime mbështetëse që e afrojnë projektin drejt një aplikacioni full funksional.

### Feature e Re (feature kryesore e sprintit)
Feature kryesore e këtij sprinti do të jetë **krijimi i një rezervimi të ri (Create Booking)** në mënyrë të plotë dhe funksionale nga frontend deri në databazë.

#### Përshkrimi i feature-it
Qëllimi është që përdoruesi të mund të plotësojë një formë rezervimi në frontend dhe sistemi ta ruajë rezervimin me sukses në PostgreSQL, duke kaluar në mënyrë të rregullt nëpër shtresat e aplikacionit.

#### Rrjedha e plotë e feature-it
- **UI / Frontend:** përdoruesi plotëson formën e rezervimit me të dhënat përkatëse
- **API / Controller:** kërkesa dërgohet nga frontend te endpoint-i për krijimin e rezervimit
- **Service:** bëhet validimi i të dhënave dhe logjika e biznesit për krijimin e rezervimit
- **Repository:** të dhënat ruhen në PostgreSQL
- **Response back to UI:** sistemi kthen përgjigje suksesi ose gabimi dhe frontend shfaq mesazhin përkatës për përdoruesin

#### Çka do të përfshijë kjo feature?
- formë funksionale për krijimin e rezervimit në frontend
- lidhje reale të formës me backend API
- validim të inputeve para ruajtjes
- ruajtje reale të të dhënave në PostgreSQL
- mesazh suksesi nëse rezervimi krijohet me sukses
- mesazh i qartë gabimi nëse inputi është jo valid ose nëse ruajtja dështon

#### Pse kjo është feature kryesore?
Kjo feature përfaqëson funksionalitetin më të rëndësishëm të sistemit, sepse booking workflow është pjesa qendrore e projektit MD Creative. Për këtë arsye, implementimi i kësaj rrjedhe nga fillimi deri në fund do të jetë fokusi kryesor i sprintit dhe demonstrimi kryesor i arkitekturës **UI → Service → Repository**.

---

### Përmirësime dhe objektiva mbështetëse të sprintit

#### 1. PostgreSQL CRUD Completion
Përveç feature-it kryesor, një nga objektivat kryesore të këtij sprinti është kompletimi i CRUD operacioneve me PostgreSQL për entitetet kryesore të sistemit.

##### Çka do të bëj?
- do të përfundoj lidhjen reale të backend-it me PostgreSQL aty ku kërkohet CRUD funksional
- do të siguroj që repository-t e databazës të përdoren në mënyrë të rregullt për:
  - krijim
  - lexim
  - përditësim
  - fshirje
- do të përmirësoj rrjedhën `controller → service → repository → database`
- do të plotësoj pjesët që janë ende vetëm strukturë me implementim real funksional

#### 2. Frontend UI Finalization
Në këtë sprint do të fokusohem edhe në rregullimin dhe finalizimin e frontend-it.

##### Çka do të përfshijë kjo?
- rregullim të layout-it dhe strukturës së faqeve kryesore
- përmirësim të formave dhe inputeve
- organizim më të pastër të komponenteve
- përmirësim të përdorshmërisë dhe qartësisë vizuale
- shfaqje më profesionale të të dhënave për përdoruesin
- trajtim më të mirë të loading, empty dhe error states

#### 3. Frontend–Backend API Integration
Një pjesë shumë e rëndësishme e sprintit do të jetë integrimi më i plotë i frontend-it me backend-in.

##### Çka do të bëj?
- do të lidh format dhe komponentët e frontend-it me API routes të backend-it
- do të siguroj që të dhënat reale të vijnë nga backend-i dhe databaza
- do të rregulloj request/response flow në rrjedhat kryesore
- do të përmirësoj mënyrën si UI reagon ndaj përgjigjeve të backend-it

#### 4. Authentication Expansion
Authentication tashmë ekziston si strukturë, por në sprint do ta zgjeroj dhe forcoj këtë pjesë.

##### Çka do të përfshijë kjo?
- validim më i mirë i login/register flows
- kontroll më i mirë i kredencialeve
- trajtim më i qartë i rasteve kur qasja refuzohet
- përmirësim të mbrojtjes së routes sipas nevojës së projektit
- përgatitje më të mirë për role-based access, nëse kjo pjesë arrin të përfshihet në sprint

#### 5. Booking Workflow Improvements
Meqenëse booking management është pjesa qendrore e sistemit, ky sprint do të fokusohet edhe në përmirësimin e workflow të rezervimeve.

##### Çka do të bëj?
- do ta bëj rrjedhën e krijimit dhe menaxhimit të rezervimeve më të plotë
- do të lidh rezervimin me entitetet relevante si packages, mascots dhe extras aty ku është planifikuar nga sistemi
- do të shtoj validime më të mira për të dhënat e rezervimit
- do të trajtoj rastet kur rezervimi nuk mund të krijohet ose kur mungojnë të dhëna
- do të përmirësoj logjikën nga inputi i userit deri te ruajtja e rezervimit

#### 6. Search / Filter dhe përdorshmëri më e mirë
Për ta bërë sistemin më praktik për përdoruesin, do të shtoj ose përmirësoj funksionalitete kërkimi dhe filtrimi.

##### Çka do të përfshijë kjo?
- kërkim sipas emrit për iteme, paketa ose rezervime
- filtrim më i lehtë në listat ekzistuese
- paraqitje më e qartë e rezultateve
- mesazhe të kuptueshme kur nuk gjendet asnjë rezultat

#### 7. Deployment
Në fund të sprintit synoj që projekti të vendoset online në mënyrë që të jetë i qasshëm nga pajisje të ndryshme dhe nga përdorues të tjerë.

##### Çka synoj?
- deploy të frontend-it në një platformë si Vercel ose zgjidhje të ngjashme
- deploy të backend-it në një platformë të përshtatshme
- konfigurim korrekt të environment variables
- lidhje të saktë mes frontend-it të deploy-uar dhe backend-it
- testim të funksionaliteteve kryesore pas deploy-it

---

## Error Handling (çka do të shtosh)

Një nga synimet kryesore të këtij sprinti është që aplikacioni të mos crashojë dhe të japë gjithmonë mesazhe të qarta për përdoruesin.

### Rastet konkrete që do t’i trajtoj
1. database / file read-write errors  
2. input validation errors  
3. missing resource / not found errors  
4. authentication / authorization errors  
5. API response errors ndërmjet frontend-it dhe backend-it  

### Ku do ta shtoj?
- në Repository: për operacione me database dhe file
- në Service: për validim, business rules dhe logjikë
- në UI / Frontend: për inpute, forma dhe mesazhe
- në API layer: për request/response handling

### Shembuj konkretë të error handling
- nëse përdoruesi dërgon formë rezervimi me fusha të zbrazëta, sistemi nuk e ruan rezervimin dhe frontend shfaq mesazh si: `Ju lutem plotësoni të gjitha fushat e detyrueshme`
- nëse kërkohet një booking ID që nuk ekziston, backend kthen përgjigje `404 Not Found`, ndërsa UI shfaq mesazh si: `Rezervimi nuk u gjet`
- nëse ndodh problem gjatë ruajtjes në databazë, sistemi kthen mesazh të kontrolluar dhe aplikacioni nuk crashon
- nëse useri jep kredenciale të pasakta, sistemi nuk lejon hyrjen dhe shfaq mesazh të qartë pa e ndërprerë aplikacionin

### Qëllimi
Që sistemi të vazhdojë ekzekutimin, të mos mbyllet dhe të komunikojë qartë edhe kur ndodhin gabime.

---

## Teste (çka do të testosh)

Në këtë sprint do të shtoj testim automatik për pjesët më të rëndësishme që implementohen ose përmirësohen.

### Metodat / rrjedhat që do të testohen
- service methods që lidhen me krijimin e rezervimit
- booking-related logic
- authentication methods
- search/filter methods
- validime për input jo valid
- rrjedha bazë e përgjigjeve të sistemit në raste gabimi

### Rastet që do të kontrollohen
1. rast normal — rezervimi krijohet me sukses dhe ruhet në databazë  
2. rast negativ — rezervimi dështon sepse mungojnë të dhënat ose entiteti nuk ekziston  
3. rast kufitar — input bosh, input jo valid, data jo e plotë  
4. rast error — dështim në database, file layer ose API flow  

### Synimi minimal i testimit
- projekti i testimit të ekzistojë dhe të kompajlohet
- minimum 3 teste të kalojnë
- testet të mbulojnë së paku një rast normal, një rast negativ dhe një rast kufitar

### Shembuj të testeve që synoj të shtoj
- krijimi i një rezervimi valid kthen sukses
- krijimi i një rezervimi me fusha të zbrazëta refuzohet
- kërkimi i një rezervimi që ekziston kthen rezultat
- kërkimi i një rezervimi që nuk ekziston kthen përgjigje pa rezultat

---

## Rezultati i synuar i Sprint 2

Në fund të këtij sprinti synoj që projekti të ketë:

- një feature kryesore end-to-end për krijimin e rezervimit të ri
- backend më funksional dhe më të lidhur me PostgreSQL
- frontend më të rregullt dhe më profesional
- integrim më të plotë ndërmjet frontend-it dhe backend-it
- authentication më të fortë
- booking workflow më të plotë
- search/filter më praktik
- error handling më të mirë
- unit tests bazë për pjesët kyçe
- deploy publik për qasje në pajisje të ndryshme
