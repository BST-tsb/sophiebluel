fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then((datas) => {
        let works = datas
        const gallery = document.querySelector('.gallery');
        function galleryPrincipal() {
            gallery.innerHTML = '';
            for(let i = 0; i < works.length; i++) {
                gallery.innerHTML += '<figure>'
                + '<img src="' + works[i].imageUrl + '" />'
                + '<figcaption> ' + works[i].title +'</figcaption>'
                + '</figure>' ;
        }
        }
        galleryPrincipal();


        const filter0 = document.querySelector('.filter0');
        const filter1 = document.querySelector('.filter1');
        const filter2 = document.querySelector('.filter2');
        const filter3 = document.querySelector('.filter3');


        filter0.addEventListener('click', function() {
            gallery.innerHTML = '';
            document.querySelector('.filter0').className = 'btn filter0 bg-green';
            document.querySelector('.filter1').className = 'btn filter1';
            document.querySelector('.filter2').className = 'btn filter2';
            document.querySelector('.filter3').className = 'btn filter3';
            filterWorks(null)
        })

        filter1.addEventListener('click', function() {
            document.querySelector('.filter0').className = 'btn filter0';
            document.querySelector('.filter2').className = 'btn filter2';
            document.querySelector('.filter3').className = 'btn filter3';
            document.querySelector('.filter1').className = 'btn filter1 bg-green';
            filterWorks(1)
        })
        filter2.addEventListener('click', function() {
            document.querySelector('.filter0').className = 'btn filter0';
            document.querySelector('.filter1').className = 'btn filter1';
            document.querySelector('.filter3').className = 'btn filter3';
            document.querySelector('.filter2').className = 'btn filter2 bg-green';
            filterWorks(2)

            
        })
        filter3.addEventListener('click', function() {
            document.querySelector('.filter0').className = 'btn filter0';
            document.querySelector('.filter1').className = 'btn filter1';
            document.querySelector('.filter2').className = 'btn filter2';
            document.querySelector('.filter3').className = 'btn filter3 bg-green';
            filterWorks(3)
        })
        const filterWorks = (category) => {
            const datasfilter = category !== null ? works.filter(function (work) {
                return work.categoryId === category;
            }) :works;
            gallery.innerHTML = '';
            for(let i = 0; i < datasfilter.length; i++) {
                gallery.innerHTML += '<figure>'
                + '<img src="' + datasfilter[i].imageUrl + '" />'
                + '<figcaption> ' + datasfilter[i].title +'</figcaption>'
                + '</figure>' ;
            }
            
        }
        let token = window.localStorage.getItem('token');
        const btnModifier = document.querySelector('.edit');
        
        const login = document.querySelector('.login');
        if (token){
            document.querySelector('.header-fix').style["display"] = 'flex';
            document.querySelector('.edit').style["display"] = 'flex';
            document.querySelector('.edit2').style["display"] = 'flex';
            login.innerHTML = 'logout';
            login.addEventListener('click', function() {
                window.localStorage.removeItem('token');
                window.location.href = 'index.html';
                
                
            })
        }
    

        const galleryModal = document.querySelector('.gallery-modal');
        function gallerieModal() {
            galleryModal.innerHTML = '';
            console.log(works)
            for(let i = 0; i < works.length; i++) {
                galleryModal.innerHTML += `
                    <div class="modal-img">
                        <img src="${works[i].imageUrl}" />
                        <p class="modal-edit">éditer</p>
                        <div class=" elment${i}"><i class="fa-solid fa-up-down-left-right"></i></div>
                        <div class="modal-abso" data-id="${works[i].id}"></i><i class="fa-solid fa-trash-can"></i></div>
                    </div>
                `
            }
            let deleteImgs = document.querySelectorAll('.modal-abso');
            deleteImgs.forEach(deleteImg => {
                deleteImg.addEventListener('click', function(){
                    const id = deleteImg.dataset.id 
                    fetch(`http://localhost:5678/api/works/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then(function(response) {
                        console.log(response);
                        console.log("ma requete est fini")
                        works = works.filter(function(work){
                            return work.id != id
                        })
                        gallerieModal();
                        galleryPrincipal();
                    })
                    
                })
            })
            
        }
        gallerieModal();
        
        
        btnModifier.addEventListener('click', function() {
            document.querySelector('.modal-cont').style["display"] = 'flex';
            document.querySelector('.modal').style["display"] = 'block';
        });
        const btnModifier2 = document.querySelector('.edit-mod');
        btnModifier2.addEventListener('click', function() {
            document.querySelector('.modal-cont').style["display"] = 'flex';
            document.querySelector('.modal').style["display"] = 'block';
        });
        const btnModifier3 = document.querySelector('.edit2');
        btnModifier3.addEventListener('click', function() {
            document.querySelector('.modal-cont').style["display"] = 'flex';
            document.querySelector('.modal').style["display"] = 'block';
        });
        
        const addImg = document.querySelector('.add-modal');
        addImg.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'none';
            document.querySelector('.modal-add-img').style["display"] = 'block';
        });
        const leave = document.querySelector('.fa-xmark');
        leave.addEventListener('click', function(){
            document.querySelector('.modal-cont').style["display"] = 'none';
            document.querySelector('.modal').style["display"] = 'none';
            
        });
        const leaveImg = document.querySelector('.leave2');
        leaveImg.addEventListener('click', function(){
            document.querySelector('.modal-cont').style["display"] = 'none';
            document.querySelector('.modal-add-img').style["display"] = 'none';
            
        });
        const arrowBack = document.querySelector('.fa-arrow-left');
        arrowBack.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'block';
            document.querySelector('.modal-add-img').style["display"] = 'none';
        });
             
        const deleteAll = document.querySelector('.delete-modal');
        deleteAll.addEventListener('click', function(){
            fetch(`http://localhost:5678/api/works/1`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(function(response) {
                    console.log(response);
                })
            gallerieModal();
            galleryPrincipal();
            
        })
        
        const formAdd = document.querySelector('.form-add');
        formAdd.addEventListener('submit', async function(event){
            event.preventDefault();
            let token = window.localStorage.getItem('token');
            const image = document.querySelector('.photo').files[0];
            const title = document.querySelector('.title').value;
            const categoryId = document.querySelector('.category-choice').value;
            let category;
            if (categoryId === "objets") {
                category = 1;
            }
            else if (categoryId === "appartements") {
                category = 2;
            }
            else if (categoryId === "hotels") {
                category = 3;
            }
            const errorAdd = document.querySelector('.error-formadd');
           if (!title || !image || !category) {
                console.log('false');
                
                errorAdd.innerHTML = `<p class='erreur-msg'>Veuillez bien remplir les champs</p>`
            }
            else {
                errorAdd.innerHTML = ``
                const formData = new FormData();
                formData.append('title', title);
                formData.append('image', image);
                formData.append('category', category);
                console.log('true')
                
                console.log(formData.get('image', 'category', 'title'));
                fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                })
                .then(function(response) {
                   return response.json()
                })
                .then(function(data){
                    console.log(data)
                    data.categoryId = Number(data.categoryId)
                    
                    works.push(data);
                    
                    gallerieModal();
                    galleryPrincipal();
                }) 
            }
           
        })
        const input = document.querySelector(".photo")
        const output = document.querySelector("output")
        let imagesArray = []

        input.addEventListener("change", () => {
        const file = input.files
        imagesArray.push(file[0])
        displayImages()
        document.querySelector('.add-img-btn').style["display"] = 'none';
        document.querySelector('.fa-image').style["display"] = 'none';
        document.querySelector('.fill-accept').style["display"] = 'none';
        })
        function displayImages() {
        let images = ""
        imagesArray.forEach((image) => {
            images = `<div class="cont-img">
                        <img src="${URL.createObjectURL(image)}" class="img-upload" alt="votre image">
                        
                    </div>`
        })
        output.innerHTML = images
        }

       

    })
   


    
