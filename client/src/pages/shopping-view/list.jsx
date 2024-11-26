import ProductFilter from "@/components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopProducts, getProductDetails } from "@/store/shop-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/productDetailsDialog";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import { useToast } from "@/hooks/use-toast";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  console.log(queryParams, "queryParams");
  return queryParams.join("&");
}

const ShoppingList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { listProducts, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const { toast } = useToast();
  console.log(listProducts, "list products");
  const handleSort = (value) => {
    console.log(value);
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    console.log(getSectionId, getCurrentOption);

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };

  const handleAddtoCart = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .then((data) => {
        console.log(data, "toast data");
        console.log("toast is acceptable", data?.payload?.success);
        if (data?.payload?.success) {
          toast({
            title: "Product added to cart to successfully.",
            variant: "primary",
          });
          dispatch(fetchCartItems(user?.id))
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
          console.log("hi");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(getAllShopProducts({ filterParams: filters, sortParams: sort }))
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
  }, [dispatch, sort, filters]);

  const productDetailsHandler = (id) => {
    console.log(id, "product Details handler");
    dispatch(getProductDetails(id))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDialogBox(true);
  }, [productDetails]);

  console.log(filters, searchParams, "filters");
  console.log(productDetails, "productDetails");
  //console.log(cartItems, "cartitems");

  return (
    <div className="grid p-4 grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 gap-3 border-b flex items-center justify-between">
          <h2 className="text-lg mr-2 font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {listProducts?.length}
            </span>

            <DropdownMenu className="bg-white z-50">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex bg-background bg-gray-600 text-white rounded-lg items-center"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px bg-white z-50"
              >
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.label}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listProducts && listProducts.length > 0
            ? listProducts.map((product) => (
                <ShoppingProductTile
                  productDetailsHandler={productDetailsHandler}
                  product={product}
                  key={product._id}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <div>
        <ProductDetailsDialog
          open={openDialogBox}
          setOpen={setOpenDialogBox}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
};

export default ShoppingList;
