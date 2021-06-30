const info = new Vue({
            el: '#app',
            data: {
                sitename: 'Lessons',
                lessons: [],
                cart: [],
                showProduct: false,
                order: {
                    firstName: '',
                    lastName: '',
                },
                sort: 'ascending',
                type: '',
                user: {
                    name: '',
                    number: ''
                }
            },
                methods: {
                decrement_inventory(product) {
                    product.availableInventory = product.availableInventory - 1;
                },
                isenable: function (product) {
                    if (product.availableInventory > 0) {
                        return true
                    }
                    else {
                        return false
                    }
                },

                addtocart: function (product) {
                    this.cart.push(product);
                    console.log(product);
                    this.cartID.push(product.id)
                   

                    const newavailableInventory = product.availableInventory;


                    fetch('https://moscst3145.herokuapp.com/collection/products/' + product._id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ availableInventory: newavailableInventory })
                    }).then(function (data) {
                     
                     
                    });


                },
                showcheckout() {
                    this.showproduct = this.showproduct ? false : true;
                },
                removefromcart: function (product) {

                    product.availableInventory = product.availableInventory + 1;
                    const newavail = product.availableInventory;
                    this.cart.pop(product)
                    fetch('https://moscst3145.herokuapp.com/collection/products/' + product._id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ availableInventory: newavail })
                    }).then(function (data) {
                   
                       

                    });


                },


                submitForm() {
                    fetch('https://moscst3145.herokuapp.com/collection/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ Name: this.order.name, Phone: this.order.phone, ProductsInOrders: this.cart.map(({ subject }) => subject) })}).then(function () {


                    });

                    this.cart.forEach(element => {

                        fetch('https://moscst3145.herokuapp.com/collection/products/' + element._id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ availableInventory: element.availableInventory })}).then(function (data) {
                         

                        });

                    });


                    alert('Order submitted')
                },

                cartCount(id) {
                    let count = 0;
                    for (let i = 0; i < this.cartID.length; i++) {
                        if (this.cartID[i] === id) {
                            count++
                        }
                    }
                    return count;
                },

            },

            computed: {
                enableshoppingcart: function () {
                    if (this.cart.length > 0) {
                        return true
                    }
                    else {
                        return false
                    }
                },


            },

            created: function () {

                fetch('https://moscst3145.herokuapp.com/collection/products').then(
                    function (response) {
                        response.json().then(
                            function (json) {
                                webstore.products = json;
                               
                            });
                    });

            }


        });
