export interface Meal {
	id: number;
	mealName: string;
	date: number;
	dishes: Dish[];
}

export interface Dish {
	id: string;
	dishName: string;
	products: Product[];
}

export interface Product {
	id: string;
	productName: string;
	amount: number;
	proteins: number;
	carbo: number;
	fats: number;
	calories: number;
}

export interface Summary {
	proteins: string;
	carbo: string;
	fats: string;
	calories: string;
}

export interface AggregatedMeals {
	[key: string]: Meal[];
}
