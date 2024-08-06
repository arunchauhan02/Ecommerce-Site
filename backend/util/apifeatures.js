class ApiFeatures{
    constructor(query,querystr){
        this.query = query;
        this.querystr = querystr;
    }
    search(){
        const keyword = this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $options:"i"
            }
        }:{}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy = {...this.querystr};
        
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach(key=>{delete querycopy[key]})

        let querystr = JSON.stringify(querycopy);
        
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        querystr = JSON.parse(querystr);

        this.query = this.query.find(querystr);

        //filter for price and rating


        return this;
    }

    pagination(resultperpage){
        const currentpage = Number(this.querystr.page) || 1;
        
        const skip = resultperpage*(currentpage-1);

        this.query = this.query.limit(resultperpage).skip(skip);

        return this;
    }
}

class productsPerPage{
    constructor(query,querystr,pageQuery){
        this.query = query;
        this.querystr = querystr;
        this.pageQuery = pageQuery;
    }
    search(){
        this.query = this.query.find({category:this.querystr.id});
        return this;
    }
    filter(){
        const querycopy = {...this.pageQuery};
        const removeFields = ["keyword","page","limit"]
        removeFields.forEach(key=>{delete querycopy[key]})

        let querystr = JSON.stringify(querycopy);
        
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        querystr = JSON.parse(querystr);

        this.query = this.query.find(querystr);

        //filter for price and rating


        return this;
    }
    pagination(resultperpage){
        const currentpage = Number(this.pageQuery.page) || 1;
        const skip = resultperpage*(currentpage-1);
        this.query = this.query.limit(resultperpage).skip(skip)
        return this;
    }
}

module.exports = {ApiFeatures,productsPerPage}