import {Context} from "../../../../utils/generic/context";
import {CategoryController} from "../controllers/category.controller";
import {CreateCategoryParams, UpdateCategoryParams} from "../types/category.type";
import {retrieveToken} from "../../shared/utils";
import {Post, Project} from "../main.model";


export default {
    query: {
        getCategories:  async (_parent: any, args: {  token: string  }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CategoryController()).getAllCategory(args.token);
        },
    },
    mutation: {
        createCategory: async (_parent: any, args: { input: CreateCategoryParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CategoryController()).createCategory(args.input, context);
        },
        updateCategory: async (_parent: any, args: { input: UpdateCategoryParams }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CategoryController()).updateCategory(args.input, context);
        },
        deleteCategory: async (_parent: any, args: { input: { id: string } }, context: Context) => {
            context = await retrieveToken(context);
            return await (new CategoryController()).deleteCategory(args.input, context);
        },
    },
    others: {
        Category: {
            posts: (category: any)=>{
                return Post.findMany({where:  {categoryId: category.id}})
            },
            project: (category: any) => {
                return Project.findFirst({where: {id: category.projectId}})
            }
        }
    }
}