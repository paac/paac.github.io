To-do
======

1. Alternate estimates
2. Calculate taxes/shop supplies
	1. 6% on parts, pre-tax
		- hazardMaterials = (parts * .06)
		- if (hazardMaterials > hazardMaterialsCap) hazardMaterials = hazardMaterialsCap
	2. 6% on labor, pre-tax
		- shopSupplies = (labor * .06)
		- if (shopSupplies > shopSuppliesCap) shopSupplies = shopSuppliesCap
	3. taxableAmount = salesPriceTotal + hazardMaterials + shopSupplies
	4. subTotal = taxableAmount + laborPrice
	5. total = (taxableAmount * 1.06) + laborPrice

