//variables
const sliderBox = document.querySelector("#slider");
const sliderDuration = 4000;
let limitFieldMin = document.getElementById("slider-limit-value-min");
let limitFieldMax = document.getElementById("slider-limit-value-max");
let rangePrice = document.getElementById("slider-r");
let intervalID = setInterval(() => {
    if (sliderBox !== null) {
        slider();
    }
}, sliderDuration);
let intervalIDB = setInterval(() => {
    if (document.querySelector("#slider-b") !== null) {
        sliderB();
    }
}, sliderDuration);
let productImg;
//Event Listener
eventListener();

function eventListener() {
    window.onscroll = function () {
        scrollProgress();
    };
    document.addEventListener("scroll", () => {
        if (window.scrollY <= 100 && window.pageYOffset <= 100) {
            document.querySelector("#goTop").classList.remove("active-btn");
        } else {
            document.querySelector("#goTop").classList.add("active-btn");
        }
    });
    if (document.querySelector("#goTop") !== null) {
        document.querySelector("#goTop").addEventListener("click", function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    }
    if (document.querySelector("#goDown") !== null) {
        document.querySelector("#goDown").addEventListener("click", function () {
            document.querySelector("#comeHere").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
        if (sliderBox !== null) {
            sliderBox.querySelectorAll(".slider .slider-item").forEach((e, index) => {
                if (index === 0) {
                    document.querySelector("#slider-dots").innerHTML += `
                <li class="active" onclick="numSlide(${index})">
                    <span></span>
                    <svg viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
                        <circle stroke="#fff" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                        <circle class="circle" stroke-width="1" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                    </svg>
                </li>
                `;
                    if (document.querySelector("#slider-dots-b")) {
                        document.querySelector("#slider-dots-b").innerHTML += `
                    <li class="active" onclick="numSlideB(${index})">
                        <span></span>
                        <svg viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
                            <circle stroke="#fff" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                            <circle class="circle" stroke-width="1" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                        </svg>
                    </li>
                    `;
                    }
                } else {
                    document.querySelector("#slider-dots").innerHTML += `
                <li onclick="numSlide(${index})">
                <span></span>
                <svg viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
                    <circle stroke="#fff" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                    <circle class="circle" stroke-width="1" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                </svg>
               </li>
                `;
                    if (document.querySelector("#slider-dots-b")) {
                        document.querySelector("#slider-dots-b").innerHTML += `
                    <li onclick="numSlideB(${index})">
                    <span></span>
                    <svg viewBox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">
                        <circle stroke="#fff" stroke-width="1" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                        <circle class="circle" stroke-width="1" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431"></circle>
                    </svg>
                   </li>
                    `;
                    }
                }
            });
        }
    });
    if (document.querySelector("#next-slide") !== null) {
        document.querySelector("#next-slide").addEventListener("click", nextSlide);
    }
    if (document.querySelector("#prev-slide") !== null) {
        document.querySelector("#prev-slide").addEventListener("click", prevSlide);
    }
    if (document.querySelector("#next-slide-b") !== null) {
        document.querySelector("#next-slide-b").addEventListener("click", nextSlideB);
    }
    if (document.querySelector("#prev-slide-b") !== null) {
        document.querySelector("#prev-slide-b").addEventListener("click", prevSlideB);
    }
    document.querySelector(".mega-menu-toggle").addEventListener("mouseover", function () {
        document.querySelector("#megaMenu").classList.add("show-mega-menu");
    });
    document.querySelector(".mega-menu-toggle").addEventListener("mouseleave", function () {
        document.querySelector("#megaMenu").classList.remove("show-mega-menu");
    });
    document.querySelector("#megaMenu").addEventListener("mouseover", function () {
        this.classList.add("show-mega-menu");
        document.querySelector(".mega-menu-toggle").classList.add("active");
    });
    document.querySelector("#megaMenu").addEventListener("mouseleave", function () {
        this.classList.remove("show-mega-menu");
        document.querySelector(".mega-menu-toggle").classList.remove("active");
    });

    document.querySelector(".mega-menu-customize-toggle").addEventListener("mouseover", function () {
        document.querySelector("#megaMenu2").classList.add("show-mega-menu");
    });
    document.querySelector(".mega-menu-customize-toggle").addEventListener("mouseleave", function () {
        document.querySelector("#megaMenu2").classList.remove("show-mega-menu");
    });
    document.querySelector("#megaMenu2").addEventListener("mouseover", function () {
        this.classList.add("show-mega-menu");
        document.querySelector(".mega-menu-customize-toggle").classList.add("active");
    });
    document.querySelector("#megaMenu2").addEventListener("mouseleave", function () {
        this.classList.remove("show-mega-menu");
        document.querySelector(".mega-menu-customize-toggle").classList.remove("active");
    });
    document.querySelectorAll("#megaMenu2 .mega-link").forEach((e) => {
        e.addEventListener("mouseover", function () {
            document.querySelectorAll("#megaMenu2 .boxs .box").forEach((e) => {
                e.classList.remove("d-block");
            });
            document.querySelectorAll("#megaMenu2 .boxs .box")[this.getAttribute("data-box") - 1].classList.add("d-block");
            document.querySelectorAll("#megaMenu2 .mega-link").forEach((e) => {
                e.classList.remove("mega-link-active");
            });
            this.classList.add("mega-link-active");
        });
    });
    document.querySelectorAll("#megaMenu .mega-link").forEach((e) => {
        e.addEventListener("mouseover", function () {
            document.querySelectorAll("#megaMenu .boxs .box").forEach((e) => {
                e.classList.remove("d-block");
            });
            document.querySelectorAll("#megaMenu .boxs .box")[this.getAttribute("data-box") - 1].classList.add("d-block");
            document.querySelectorAll("#megaMenu .mega-link").forEach((e) => {
                e.classList.remove("mega-link-active");
            });
            this.classList.add("mega-link-active");
        });
    });
    // document.querySelector("#search-show").addEventListener("click", function () {
    //     document.querySelector("#searchBox").classList.add("search-active");
    // });
    document.querySelector("#searchMobile").addEventListener("click", function () {
        document.querySelector("#searchBox").classList.add("search-active");
        console.log("yes");
    });
    document.querySelector("#close-search").addEventListener("click", function () {
        document.querySelector("#searchBox").classList.remove("search-active");
    });
    document.querySelectorAll("#our-collections .splide__slide").forEach((e) => {
        e.addEventListener("click", function () {
            document.querySelectorAll("#our-collections .splide__slide").forEach((el) => {
                el.classList.remove("is-active");
            });
            this.classList.add("is-active");
            document.querySelector("#main-box").innerHTML = this.querySelector(".box").innerHTML;
        });
    });
    document.querySelectorAll("#our-collections .splide__arrow").forEach((e) => {
        e.addEventListener("click", function () {
            setTimeout(() => {
                document.querySelector("#main-box").innerHTML = document.querySelector("#our-collections .splide__slide.is-active").querySelector(".box").innerHTML;
            }, 500);
        });
    });
    if (document.querySelectorAll(".new-items-section .new-items-info .tabs li") !== null) {
        document.querySelectorAll(".new-items-section .new-items-info .tabs li").forEach((e) => {
            e.addEventListener("click", function () {
                document.querySelectorAll(".new-items-section .new-items-info .tabs li").forEach((el) => {
                    el.classList.remove("active");
                });
                document.querySelectorAll(".new-items-section .splide-js-boxs .splide-js-box").forEach((el) => {
                    el.classList.remove("d-block");
                });
                document.querySelectorAll(".new-items-section .splide-js-boxs .splide-js-box")[Number(this.getAttribute("data-tab-number")) - 1].classList.add("d-block");
                this.classList.add("active");
            });
        });
        document.querySelectorAll("#new-items-section li .item button").forEach((e) => {
            e.addEventListener("click", function () {
                document.querySelectorAll("#new-items-section li .item button").forEach((el) => {
                    el.classList.remove("active");
                });
                document.querySelectorAll(".new-items-section .splide-js-boxs .splide-js-box").forEach((el) => {
                    el.classList.remove("d-block");
                });
                document.querySelectorAll(".new-items-section .splide-js-boxs .splide-js-box")[Number(this.getAttribute("data-tab-number")) - 1].classList.add("d-block");
                this.classList.add("active");
            });
        });
    }
    if (document.querySelectorAll(".best-seller-section .new-items-info .tabs li") !== null) {
        document.querySelectorAll(".best-seller-section .new-items-info .tabs li").forEach((e) => {
            e.addEventListener("click", function () {
                document.querySelectorAll(".best-seller-section .new-items-info .tabs li").forEach((el) => {
                    el.classList.remove("active");
                });
                document.querySelectorAll(".best-seller-section .splide-js-boxs .splide-js-box").forEach((el) => {
                    el.classList.remove("d-block");
                });
                document.querySelectorAll(".best-seller-section .splide-js-boxs .splide-js-box")[Number(this.getAttribute("data-tab-number")) - 1].classList.add("d-block");
                this.classList.add("active");
            });
        });
        document.querySelectorAll("#best-seller-section li .item button").forEach((e) => {
            e.addEventListener("click", function () {
                document.querySelectorAll("#best-seller-section li .item button").forEach((el) => {
                    el.classList.remove("active");
                });
                document.querySelectorAll(".best-seller-section .splide-js-boxs .splide-js-box").forEach((el) => {
                    el.classList.remove("d-block");
                });
                document.querySelectorAll(".best-seller-section .splide-js-boxs .splide-js-box")[Number(this.getAttribute("data-tab-number")) - 1].classList.add("d-block");
                this.classList.add("active");
            });
        });
    }
    if (document.querySelectorAll('button[class="like"]') !== null) {
        document.querySelectorAll(".like").forEach((e) => {
            e.addEventListener("click", function () {
                if (eval(this.getAttribute("data-like")) === false) {
                    this.setAttribute("data-like", "true");
                    this.classList.add("active-like");
                } else {
                    {
                        this.setAttribute("data-like", "false");
                        this.classList.remove("active-like");
                    }
                }
            });
        });
    }
    document.querySelectorAll("#mobileMenu .category li").forEach((e) => {
        e.addEventListener("click", function () {
            document.querySelectorAll("#mobileMenu .category li").forEach((el) => {
                el.classList.remove("active");
            });
            document.querySelectorAll("#mobileMenu .boxs .box").forEach((el) => {
                el.classList.remove("d-block");
            });
            document.querySelectorAll("#mobileMenu .boxs .box")[Number(this.getAttribute("data-box-num")) - 1].classList.add("d-block");
            this.classList.add("active");
        });
    });
    document.querySelectorAll("#mobileMenu .boxs .box .accordion span").forEach((e) => {
        e.addEventListener("click", function () {
            if (!this.parentElement.classList.contains("active-accordion")) {
                this.parentElement.classList.add("active-accordion");
                this.nextElementSibling.style.height = `${this.nextElementSibling.scrollHeight}px`;
            } else {
                this.parentElement.classList.remove("active-accordion");
                this.nextElementSibling.style.height = `0px`;
            }
        });
    });
    document.querySelectorAll(".filter .accordion").forEach((e) => {
        e.addEventListener("click", function () {
            if (!this.classList.contains("active-acc")) {
                this.classList.add("active-acc");
                this.nextElementSibling.style.height = `${this.nextElementSibling.scrollHeight}px`;
            } else {
                this.classList.remove("active-acc");
                this.nextElementSibling.style.height = `0px`;
            }
        });
    });
    document.querySelector("#showMobileMenu").addEventListener("click", function () {
        document.querySelector("#mobileMenu").classList.remove("d-none");
    });
    document.querySelector("#closeMobileMenu").addEventListener("click", function () {
        document.querySelector("#mobileMenu").classList.add("d-none");
    });
    document.querySelector("#showMobileBag").addEventListener("click", function () {
        if (!this.classList.contains("active-accordion")) {
            this.classList.add("active-accordion");
            this.nextElementSibling.style.display = "block";
        } else {
            this.classList.remove("active-accordion");
            this.nextElementSibling.style.display = "none";
        }
    });
    if (document.querySelector("#sortByBtn") !== null) {
        document.querySelector("#sortByBtn").addEventListener("click", function () {
            let item = document.querySelector(".category-details .sort-box .sort-by");
            if (!item.classList.contains("active")) {
                item.classList.add("active");
                item.style.display = "block";
            } else {
                item.classList.remove("active");
                item.style.display = "none";
            }
        });
        document.querySelector("#filterBtn").addEventListener("click", function () {
            let item = document.querySelector(".category-details .sort-box .filter");
            if (!item.classList.contains("active")) {
                item.classList.add("active");
                item.style.display = "block";
            } else {
                item.classList.remove("active");
                item.style.display = "none";
            }
        });
        document.querySelector("#priceSortBtn").addEventListener("click", function () {
            let item = document.querySelector(".category-details .sort-box .price-sort");
            if (!item.classList.contains("active")) {
                item.classList.add("active");
                item.style.display = "block";
            } else {
                item.classList.remove("active");
                item.style.display = "none";
            }
        });
        document.querySelectorAll(".btn-close-filters").forEach((e) => {
            e.addEventListener("click", function () {
                this.parentElement.parentElement.classList.remove("active");
                this.parentElement.parentElement.style.display = "none";
            });
        });
    }
    if (document.querySelector("#mainLocatio") !== null) {
        document.querySelectorAll("#mainLocatio li button").forEach((e) => {
            e.addEventListener("click", function () {
                document.querySelectorAll(".splide-locations .splid-location").forEach((el) => {
                    el.classList.remove("d-block");
                });
                document.querySelectorAll("#mainLocatio li").forEach((el) => {
                    el.classList.remove("active");
                });
                document.querySelectorAll(".splide-locations .splid-location")[Number(this.parentElement.getAttribute("data-nam")) - 1].classList.add("d-block");
                this.parentElement.classList.add("active");
            });
        });
    }
    if (document.querySelector(".scroll-option") !== null) {
        document.querySelectorAll(".scroll-option.enabel .scroll-option--next").forEach((e) => {
            e.addEventListener("click", function () {
                if (this.previousElementSibling.querySelector("li.d-block").nextElementSibling !== null) {
                    this.previousElementSibling.querySelector("li.d-block").nextElementSibling.classList.add("d-block");
                    this.previousElementSibling.querySelector("li.d-block").classList.remove("d-block");
                    this.previousElementSibling.setAttribute("data-selected", `${this.previousElementSibling.querySelector("li.d-block").textContent}`);
                } else {
                    this.previousElementSibling.querySelector("li.d-block").classList.remove("d-block");
                    this.previousElementSibling.querySelectorAll("li")[0].classList.add("d-block");
                    this.previousElementSibling.setAttribute("data-selected", `${this.previousElementSibling.querySelector("li.d-block").textContent}`);
                }
            });
        });
        document.querySelectorAll(".scroll-option.enabel .scroll-option--prev").forEach((e) => {
            e.addEventListener("click", function () {
                if (this.nextElementSibling.querySelector("li.d-block").previousElementSibling !== null) {
                    this.nextElementSibling.querySelector("li.d-block").previousElementSibling.classList.add("d-block");
                    this.nextElementSibling.querySelectorAll("li.d-block")[1].classList.remove("d-block");
                    this.nextElementSibling.setAttribute("data-selected", `${this.nextElementSibling.querySelector("li.d-block").textContent}`);
                } else {
                    this.nextElementSibling.querySelectorAll("li")[this.nextElementSibling.querySelectorAll("li").length - 1].classList.add("d-block");
                    this.nextElementSibling.querySelectorAll("li")[0].classList.remove("d-block");
                    this.nextElementSibling.setAttribute("data-selected", `${this.nextElementSibling.querySelector("li.d-block").textContent}`);
                }
            });
        });
    }
    if (document.querySelector(".size-box") !== null) {
        document.querySelector(".size-box span").addEventListener("click", function () {
            if (!this.classList.contains("active-size")) {
                this.classList.add("active-size");
                this.nextElementSibling.style.height = `${this.nextElementSibling.scrollHeight}px`;
            } else {
                this.classList.remove("active-size");
                this.nextElementSibling.style.height = `0px`;
            }
        });

        document.querySelectorAll(".size-box ul li").forEach((e) => {
            e.addEventListener("click", function () {
                this.parentElement.style.height = `0px`;
                this.parentElement.previousElementSibling.classList.remove("active-size");
                this.parentElement.previousElementSibling.innerHTML = this.textContent;
            });
        });
    }
    if (document.querySelector("#enter-text-value") !== null) {
        document.querySelector("#enter-text-valid").addEventListener("click", function () {
            if (this.checked) {
                document.querySelector("#enter-text-value").disabled = false;
            } else {
                document.querySelector("#enter-text-value").disabled = true;
            }
        });

        document.querySelector("#enter-text-value").addEventListener("input", function () {
            document.querySelector("#text-len").innerHTML = this.value.length;
            if (this.value.length > 16) {
                document.querySelector("#text-len").innerHTML = 16;
                this.value = this.value.slice(0, -1);
            }
        });
    }
    if (document.querySelector(".item-img") !== null) {
        document.querySelectorAll(".item-img").forEach((e) => {
            e.addEventListener("click", function () {
                document.querySelector("#main-img-product img").src = this.querySelector("img").src;
            });
        });
    }
    if (document.querySelector("#addAddressBtn") !== null) {
        document.querySelector("#addAddressBtn").addEventListener("click", function () {
            document.querySelector(".new-address").classList.remove("d-none");
            document.querySelector(".all-address").classList.add("d-none");
        });
        document.querySelector("#confrimAddressBtn").addEventListener("click", function () {
            document.querySelector(".new-address").classList.add("d-none");
            document.querySelector(".all-address").classList.remove("d-none");
        });
    }
    if (document.querySelector(".product-box") !== null) {
        document.querySelectorAll(".product-box .product-img-holder").forEach((e) => {
            e.addEventListener("mouseenter", function () {
                productImg = setInterval(() => {
                    if (this.querySelector("img.active").nextElementSibling !== null) {
                        this.querySelector("img.active").nextElementSibling.classList.add("active");
                        this.querySelector("img.active").classList.remove("active");
                    } else {
                        this.querySelector("img.active").classList.remove("active");
                        this.querySelector("img").classList.add("active");
                    }
                }, 1000);
            });
        });
        document.querySelectorAll(".product-box .product-img-holder").forEach((e) => {
            e.addEventListener("mouseleave", function () {
                clearInterval(productImg);
                this.querySelector("img.active").classList.remove("active");
                this.querySelector("img").classList.add("active");
            });
        });
    }
    if (document.querySelector(".show-more-gallery") !== null) {
        document.querySelectorAll(".show-more-gallery").forEach((e) => {
            let text = "";
            for (let i = 0; i < e.querySelectorAll(".images img").length; i++) {
                if (i === 0) {
                    text += `<li class="active-dot" data-number-gallery-img="${i}"></li>`;
                } else {
                    text += `<li data-number-gallery-img="${i}"></li>`;
                }
            }
            e.querySelector(".dots").innerHTML = text;
            //    let galleryShow =  setInterval(()=>{
            //         if (e.querySelector(".images img.active").nextElementSibling !== null) {
            //             e.querySelector(".images img.active").nextElementSibling.classList.add("active");
            //             e.querySelector(".images img.active").classList.remove("active");

            //         } else {
            //             e.querySelector(".images img.active").classList.remove("active");
            //             e.querySelector(".images img").classList.add("active");
            //         }
            //         if(e.querySelector(".dots li.active-dot").nextElementSibling !== null){
            //             e.querySelector(".dots li.active-dot").nextElementSibling.classList.add("active-dot");
            //             e.querySelector(".dots li.active-dot").classList.remove("active-dot");
            //         }else{
            //             e.querySelector(".dots li.active-dot").classList.remove("active-dot");
            //             e.querySelector(".dots li").classList.add("active-dot");
            //         }
            //     },4000)
            e.querySelectorAll(".dots li").forEach((el) => {
                el.addEventListener("click", function () {
                    // clearInterval(galleryShow)
                    e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                    this.classList.add("active-dot");
                    e.querySelector(".images img.active").classList.remove("active");
                    e.querySelectorAll(".images img")[eval(this.getAttribute("data-number-gallery-img"))].classList.add("active");
                    // galleryShow =  setInterval(()=>{
                    //     if (e.querySelector(".images img.active").nextElementSibling !== null) {
                    //         e.querySelector(".images img.active").nextElementSibling.classList.add("active");
                    //         e.querySelector(".images img.active").classList.remove("active");

                    //     } else {
                    //         e.querySelector(".images img.active").classList.remove("active");
                    //         e.querySelector(".images img").classList.add("active");
                    //     }
                    //     if(e.querySelector(".dots li.active-dot").nextElementSibling !== null){
                    //         e.querySelector(".dots li.active-dot").nextElementSibling.classList.add("active-dot");
                    //         e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                    //     }else{
                    //         e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                    //         e.querySelector(".dots li").classList.add("active-dot");
                    //     }
                    // },4000)
                });
            });
            e.querySelectorAll(".buttons li")[1].addEventListener("click", function () {
                // clearInterval(galleryShow)
                if (e.querySelector(".images img.active").nextElementSibling !== null) {
                    e.querySelector(".images img.active").nextElementSibling.classList.add("active");
                    e.querySelector(".images img.active").classList.remove("active");
                } else {
                    e.querySelector(".images img.active").classList.remove("active");
                    e.querySelector(".images img").classList.add("active");
                }
                if (e.querySelector(".dots li.active-dot").nextElementSibling !== null) {
                    e.querySelector(".dots li.active-dot").nextElementSibling.classList.add("active-dot");
                    e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                } else {
                    e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                    e.querySelector(".dots li").classList.add("active-dot");
                }
                // galleryShow =  setInterval(()=>{
                //     if (e.querySelector(".images img.active").nextElementSibling !== null) {
                //         e.querySelector(".images img.active").nextElementSibling.classList.add("active");
                //         e.querySelector(".images img.active").classList.remove("active");

                //     } else {
                //         e.querySelector(".images img.active").classList.remove("active");
                //         e.querySelector(".images img").classList.add("active");
                //     }
                //     if(e.querySelector(".dots li.active-dot").nextElementSibling !== null){
                //         e.querySelector(".dots li.active-dot").nextElementSibling.classList.add("active-dot");
                //         e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                //     }else{
                //         e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                //         e.querySelector(".dots li").classList.add("active-dot");
                //     }
                // },4000)
            });
            e.querySelectorAll(".buttons li")[0].addEventListener("click", function () {
                // clearInterval(galleryShow)
                if (e.querySelector(".images img.active").previousElementSibling !== null) {
                    e.querySelector(".images img.active").previousElementSibling.classList.add("active");
                    e.querySelectorAll(".images img.active")[1].classList.remove("active");
                } else {
                    e.querySelector(".images img.active").classList.remove("active");
                    e.querySelectorAll(".images img")[eval(e.querySelectorAll(".images img").length) - 1].classList.add("active");
                }
                if (e.querySelector(".dots li.active-dot").previousElementSibling !== null) {
                    e.querySelector(".dots li.active-dot").previousElementSibling.classList.add("active-dot");
                    e.querySelectorAll(".dots li.active-dot")[1].classList.remove("active-dot");
                } else {
                    e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                    e.querySelectorAll(".dots li")[eval(e.querySelectorAll(".dots li").length) - 1].classList.add("active-dot");
                }
                // galleryShow =  setInterval(()=>{
                //     if (e.querySelector(".images img.active").nextElementSibling !== null) {
                //         e.querySelector(".images img.active").nextElementSibling.classList.add("active");
                //         e.querySelector(".images img.active").classList.remove("active");

                //     } else {
                //         e.querySelector(".images img.active").classList.remove("active");
                //         e.querySelector(".images img").classList.add("active");
                //     }
                //     if(e.querySelector(".dots li.active-dot").nextElementSibling !== null){
                //         e.querySelector(".dots li.active-dot").nextElementSibling.classList.add("active-dot");
                //         e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                //     }else{
                //         e.querySelector(".dots li.active-dot").classList.remove("active-dot");
                //         e.querySelector(".dots li").classList.add("active-dot");
                //     }
                // },4000)
            });
        });
    }
}
//noUiSlider
if (rangePrice) {
    noUiSlider.create(rangePrice, {
        start: [0, 450000],
        behaviour: "drag",
        connect: true,
        range: {
            min: 0,
            max: 450000,
        },
    });

    rangePrice.noUiSlider.on("update", function (values, handle) {
        (handle ? limitFieldMax : limitFieldMin).innerHTML = Number(parseInt(values[handle]).toFixed(1)).toLocaleString();
    });
}
if (document.querySelector("#our-collections") !== null) {
    new Splide(document.querySelector("#our-collections"), {
        perPage: 5,
        direction: "rtl",
        pagination: false,
        perMove: 1,
        rewind: true,
        breakpoints: {
            1200: {
                perPage: 4,
            },
            992: {
                perPage: 3,
            },
            576: {
                padding: { left: "2rem", right: "2rem" },
            },
            390: {
                perPage: 2,
            },
        },
    }).mount();
}
if (document.querySelector("#new-items-section") !== null) {
    new Splide(document.querySelector("#new-items-section"), {
        perPage: 5,
        direction: "rtl",
        pagination: false,
        perMove: 1,
        rewind: true,
        breakpoints: {
            1200: {
                perPage: 4,
            },
            992: {
                perPage: 3,
            },
            576: {
                padding: { left: "2rem", right: "2rem" },
            },
            390: {
                perPage: 2,
            },
        },
    }).mount();
}
if (document.querySelector("#quick-control-mobile") !== null) {
    new Splide(document.querySelector("#quick-control-mobile"), {
        perPage: 2,
        direction: "rtl",
        pagination: false,
        perMove: 1,
        rewind: true,
    }).mount();
}
if (document.querySelector("#best-seller-section") !== null) {
    new Splide(document.querySelector("#best-seller-section"), {
        perPage: 5,
        direction: "rtl",
        pagination: false,
        perMove: 1,
        rewind: true,
        breakpoints: {
            1200: {
                perPage: 4,
            },
            992: {
                perPage: 3,
            },
            576: {
                padding: { left: "2rem", right: "2rem" },
            },
            390: {
                perPage: 2,
            },
        },
    }).mount();
}
if (document.querySelector("#new-style-splide") !== null) {
    new Splide(document.querySelector("#new-style-splide"), {
        perPage: 3,
        direction: "rtl",
        pagination: false,
        perMove: 1,
        rewind: true,
        breakpoints: {
            992: {
                perPage: 2,
            },
            575: {
                perPage: 2,
            },
        },
    }).mount();
}
if (document.getElementsByClassName("splide-items")) {
    document.querySelectorAll(".splide-items").forEach((element) => {
        new Splide(element, {
            perPage: 4,
            direction: "rtl",
            pagination: false,
            perMove: 1,
            rewind: true,
            breakpoints: {
                1200: {
                    perPage: 3,
                },
                992: {
                    perPage: 2,
                    padding: { left: "5rem" },
                },
                768: {
                    perPage: 1,
                },
                408: {
                    padding: { left: "2rem" },
                },
            },
        }).mount();
    });
}
if (document.getElementsByClassName("splide-product")) {
    document.querySelectorAll(".splide-product").forEach((element) => {
        new Splide(element, {
            perPage: 4,
            direction: "rtl",
            pagination: false,
            perMove: 1,
            rewind: true,
            breakpoints: {
                1200: {
                    perPage: 3,
                },
                576: {
                    perPage: 2,
                },
            },
        }).mount();
    });
}
if (document.querySelector(".splid-location") !== null) {
    document.querySelectorAll(".splid-location").forEach((element) => {
        new Splide(element, {
            perPage: 8,
            direction: "rtl",
            pagination: false,
            perMove: 1,
            rewind: true,
            breakpoints: {
                1200: {
                    perPage: 6,
                },
                992: {
                    perPage: 4,
                },
                575: {
                    perPage: 3,
                },
            },
        }).mount();
    });
}
if (document.querySelector(".splide-comments") !== null) {
    document.querySelectorAll(".splide-comments").forEach((element) => {
        new Splide(element, {
            perPage: 1,
            direction: "rtl",
            pagination: false,
            perMove: 1,
            rewind: true,
        }).mount();
    });
}
// functions

function slider() {
    let item = sliderBox.querySelector(".slider .slider-item.d-block");
    let dots = document.querySelector("#slider-dots li.active");
    if (item.nextElementSibling !== null) {
        item.nextElementSibling.classList.add("d-block");
        item.classList.remove("d-block");
        dots.nextElementSibling.classList.add("active");
        dots.classList.remove("active");
    } else {
        item.classList.remove("d-block");
        sliderBox.querySelectorAll(".slider .slider-item")[0].classList.add("d-block");
        dots.classList.remove("active");
        document.querySelectorAll("#slider-dots li")[0].classList.add("active");
    }
}

function nextSlide() {
    let item = sliderBox.querySelector(".slider .slider-item.d-block");
    let dots = document.querySelector("#slider-dots li.active");
    if (item.nextElementSibling !== null) {
        item.nextElementSibling.classList.add("d-block");
        item.classList.remove("d-block");
        dots.nextElementSibling.classList.add("active");
        dots.classList.remove("active");
    } else {
        item.classList.remove("d-block");
        sliderBox.querySelectorAll(".slider .slider-item")[0].classList.add("d-block");
        dots.classList.remove("active");
        document.querySelectorAll("#slider-dots li")[0].classList.add("active");
    }
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        slider();
    }, sliderDuration);
}
function prevSlide() {
    let item = sliderBox.querySelector(".slider .slider-item.d-block");
    let dots = document.querySelector("#slider-dots li.active");
    if (item.previousElementSibling !== null) {
        item.previousElementSibling.classList.add("d-block");
        sliderBox.querySelectorAll(".slider .slider-item.d-block")[1].classList.remove("d-block");
        dots.previousElementSibling.classList.add("active");
        document.querySelectorAll("#slider-dots li.active")[1].classList.remove("active");
    } else {
        item.classList.remove("d-block");
        sliderBox.querySelectorAll(".slider .slider-item")[sliderBox.querySelectorAll(".slider .slider-item").length - 1].classList.add("d-block");
        dots.classList.remove("active");
        document.querySelectorAll("#slider-dots li")[document.querySelectorAll("#slider-dots li").length - 1].classList.add("active");
    }
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        slider();
    }, sliderDuration);
}
function numSlide(num) {
    sliderBox.querySelectorAll(".slider .slider-item").forEach((e) => {
        e.classList.remove("d-block");
    });
    document.querySelectorAll("#slider-dots li").forEach((e) => {
        e.classList.remove("active");
    });
    document.querySelectorAll("#slider-dots li")[num].classList.add("active");
    sliderBox.querySelectorAll(".slider .slider-item")[num].classList.add("d-block");
    clearInterval(intervalID);
    intervalID = setInterval(() => {
        slider();
    }, sliderDuration);
}
function sliderB() {
    let item = document.querySelector("#slider-b").querySelector(".slider-b .slider-item.d-block");
    let dots = document.querySelector("#slider-dots-b li.active");
    if (item.nextElementSibling !== null) {
        item.nextElementSibling.classList.add("d-block");
        item.classList.remove("d-block");
        dots.nextElementSibling.classList.add("active");
        dots.classList.remove("active");
    } else {
        item.classList.remove("d-block");
        document.querySelector("#slider-b").querySelectorAll(".slider-b .slider-item")[0].classList.add("d-block");
        dots.classList.remove("active");
        document.querySelectorAll("#slider-dots-b li")[0].classList.add("active");
    }
}

function nextSlideB() {
    let item = document.querySelector("#slider-b").querySelector(".slider-b .slider-item.d-block");
    let dots = document.querySelector("#slider-dots-b li.active");
    if (item.nextElementSibling !== null) {
        item.nextElementSibling.classList.add("d-block");
        item.classList.remove("d-block");
        dots.nextElementSibling.classList.add("active");
        dots.classList.remove("active");
    } else {
        item.classList.remove("d-block");
        document.querySelector("#slider-b").querySelectorAll(".slider-b .slider-item")[0].classList.add("d-block");
        dots.classList.remove("active");
        document.querySelectorAll("#slider-dots-b li")[0].classList.add("active");
    }
    clearInterval(intervalIDB);
    intervalIDB = setInterval(() => {
        sliderB();
    }, sliderDuration);
}
function prevSlideB() {
    let item = document.querySelector("#slider-b").querySelector(".slider-b .slider-item.d-block");
    let dots = document.querySelector("#slider-dots-b li.active");
    if (item.previousElementSibling !== null) {
        item.previousElementSibling.classList.add("d-block");
        document.querySelector("#slider-b").querySelectorAll(".slider-b .slider-item.d-block")[1].classList.remove("d-block");
        dots.previousElementSibling.classList.add("active");
        document.querySelectorAll("#slider-dots-b li.active")[1].classList.remove("active");
    } else {
        item.classList.remove("d-block");
        document.querySelector("#slider-b").querySelectorAll(".slider-b .slider-item")[document.querySelector("#slider-b").querySelectorAll(".slider-b .slider-item").length - 1].classList.add("d-block");
        dots.classList.remove("active");
        document.querySelectorAll("#slider-dots-b li")[document.querySelectorAll("#slider-dots-b li").length - 1].classList.add("active");
    }
    clearInterval(intervalIDB);
    intervalIDB = setInterval(() => {
        sliderB();
    }, sliderDuration);
}
function numSlideB(num) {
    document
        .querySelector("#slider-b")
        .querySelectorAll(".slider-b .slider-item")
        .forEach((e) => {
            e.classList.remove("d-block");
        });
    document.querySelectorAll("#slider-dots-b li").forEach((e) => {
        e.classList.remove("active");
    });
    document.querySelectorAll("#slider-dots-b li")[num].classList.add("active");
    document.querySelector("#slider-b").querySelectorAll(".slider-b .slider-item")[num].classList.add("d-block");
    clearInterval(intervalIDB);
    intervalIDB = setInterval(() => {
        sliderB();
    }, sliderDuration);
}

function scrollProgress() {
    if (document.querySelector("#collectionsNew") !== null) {
        let topHeight = window.pageYOffset + document.querySelector("#collectionsNew").getBoundingClientRect().top;
        let bottomHeight = window.pageYOffset + document.querySelector("#collectionsNew").getBoundingClientRect().bottom;
        let number = (bottomHeight - topHeight) / 100;
        let current = document.documentElement.scrollTop || document.body.scrollTop;
        if (current >= topHeight) {
            for (let i = 0; i <= 100; i++) {
                if (current >= topHeight + i * number) {
                    document.querySelector(".progress-line").style.height = `${i + 10}%`;
                }
            }

            let height = Number(document.querySelector(".progress-line").style.height.slice(0, -1));

            if (height >= 5) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#90a08c";
            }
            if (height >= 25) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#90a08c";
            }
            if (height >= 45) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#90a08c";
            }
            if (height >= 65) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[3].style.backgroundColor = "#90a08c";
            }
            if (height >= 85) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[3].style.backgroundColor = "#90a08c";
                document.querySelectorAll(".square li")[4].style.backgroundColor = "#90a08c";
            }

            if (height <= 5) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#eeefed";
            }
            if (height <= 25) {
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#eeefed";
            }
            if (height <= 45) {
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#eeefed";
            }
            if (height <= 65) {
                document.querySelectorAll(".square li")[3].style.backgroundColor = "#eeefed";
            }
            if (height <= 85) {
                document.querySelectorAll(".square li")[4].style.backgroundColor = "#eeefed";
            }
        }
        if (current <= topHeight) {
            document.querySelector(".progress-line").style.height = `0%`;
            document.querySelectorAll(".square li")[0].style.backgroundColor = "#eeefed";
        }
    }
    if (document.querySelector("#storyNew") !== null) {
        let topHeight = window.pageYOffset + document.querySelector("#storyNew").getBoundingClientRect().top;
        let bottomHeight = window.pageYOffset + document.querySelector("#storyNew").getBoundingClientRect().bottom;
        let number = (bottomHeight - topHeight) / 100;
        let current = document.documentElement.scrollTop || document.body.scrollTop;
        if (current >= topHeight) {
            for (let i = 0; i <= 100; i++) {
                if (current >= topHeight + i * number) {
                    document.querySelector(".progress-line").style.height = `${i + 10}%`;
                }
            }

            let height = Number(document.querySelector(".progress-line").style.height.slice(0, -1));

            if (height >= 13) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#baccb6";
            }
            if (height >= 37) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#baccb6";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#baccb6";
            }
            if (height >= 61) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#baccb6";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#baccb6";
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#baccb6";
            }
            if (height >= 88) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#baccb6";
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#baccb6";
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#baccb6";
                document.querySelectorAll(".square li")[3].style.backgroundColor = "#baccb6";
            }

            if (height <= 13) {
                document.querySelectorAll(".square li")[0].style.backgroundColor = "#eeefed";
            }
            if (height <= 37) {
                document.querySelectorAll(".square li")[1].style.backgroundColor = "#eeefed";
            }
            if (height <= 61) {
                document.querySelectorAll(".square li")[2].style.backgroundColor = "#eeefed";
            }
            if (height <= 88) {
                document.querySelectorAll(".square li")[3].style.backgroundColor = "#eeefed";
            }
        }
        if (current <= topHeight) {
            document.querySelector(".progress-line").style.height = `0%`;
            document.querySelectorAll(".square li")[0].style.backgroundColor = "#eeefed";
        }
    }
}
