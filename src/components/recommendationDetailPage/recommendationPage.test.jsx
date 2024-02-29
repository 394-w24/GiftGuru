import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecommendationDetailPage from "./recommendationDetailPage";

const stateMock = {
  recommendation: {
    position: 1,
    title: "Coca-Cola Cola - 24 pack, 12 fl oz cans",
    link: "https://www.walmart.com/ip/Coca-Cola-Soda-Pop-12-fl-oz-24-Pack-Cans/10535216?wl13=2068&selectedSellerId=0",
    product_link:
      "https://www.google.com/shopping/product/14741644081857977837?gl=us",
    product_id: "14741644081857977837",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=us&google_domain=google.com&hl=en&product_id=14741644081857977837",
    number_of_comparisons: "10+",
    comparison_link:
      "https://www.google.com/shopping/product/14741644081857977837/offers?gl=us&q=Cola,+Soda,+Beverage,+Drink,+Carbonated&num=75&hl=en&prds=eto:7775472533094549844_0,local:1,pid:17371575708451950618,prmr:2,rsk:PC_15846208425820396243&sa=X&ved=0ahUKEwjm8prou8-EAxUzQ6QEHSDPBxsQ3q4ECIIS",
    serpapi_product_api_comparisons:
      "https://serpapi.com/search.json?engine=google_product&filter=eto%3A7775472533094549844_0%2Clocal%3A1%2Cpid%3A17371575708451950618%2Cprmr%3A2%2Crsk%3APC_15846208425820396243&hl=en&num=75&offers=1&product_id=14741644081857977837&sa=X&ved=0ahUKEwjm8prou8-EAxUzQ6QEHSDPBxsQ3q4ECIIS",
    source: "Walmart",
    price: "$13.18",
    extracted_price: 13.18,
    rating: 4.7,
    reviews: 41742,
    extensions: ["Can", "24 Pack", "Cola", "SALE"],
    badge: "Top Quality Store",
    thumbnail:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTBY91zOkq6HoDtaWaV1YPK9VnoGZLDv2RISQKjyl-k17oMHi0jEXm0ehNlNLtJ5K29ptmP0dEcjfIHOahaV4Gz91r1OdtWtjskIEpFCrFJIfqhvHcl3g-Q&usqp=CAE",
    tag: "SALE",
    delivery: "8.7 mi · In stock · Curbside · Free 90-day returns",
    store_rating: 4.5,
    store_reviews: 1800,
  },
};

const stateMock2 = {
  recommendation: {
    position: 21,
    title: "Super Mario Bros. Retro Collector's Box",
    link: "https://www.fivebelow.com/products/super-mario-bros-retro-collector-s-box?features:enable=hide_user_registration&utm_source=google&utm_medium=organic&utm_campaign=tinuiti_organicshopping",
    product_link:
      "https://www.google.com/shopping/product/1?gl=us&prds=pid:12883720834747522341",
    product_id: "12883720834747522341",
    serpapi_product_api:
      "https://serpapi.com/search.json?device=desktop&engine=google_product&gl=us&google_domain=google.com&hl=en&product_id=12883720834747522341",
    source: "Five Below",
    price: "$25.00",
    extracted_price: 25,
    thumbnail:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSKmBlLHmFn8FV8gSHuNICMRFozjezzVXt1TX5vr_8-TU61XFbL3GZg9wB6yDFZl1qa72QtJgxW6_mFREY8MxDoxxj2toivMp3B4dhsxVr6Bt95bdhVQ0Og3A&usqp=CAE",
    delivery: "Delivery by Wed, Feb 21",
    store_rating: 4.2,
    store_reviews: 102,
  },
};

describe("RecommendationDetailPage", () => {
  it("Mock Recommendation Detail Page, which should display all the necessary information as returned, including", async () => {
    const { container } = render(
      <BrowserRouter>
        <RecommendationDetailPage test={true} testState={stateMock} />
      </BrowserRouter>
    );
    const title = screen.getByTestId("title");
    expect(title.textContent).toBe(stateMock.recommendation.title);
    const thumbnail = screen.getByTestId("thumbnail");
    expect(thumbnail.src).toBe(stateMock.recommendation.thumbnail);
    const price = screen.getByTestId("price");
    expect(price.textContent).toBe(
      "$" + stateMock.recommendation.extracted_price.toFixed(2)
    );
    const rating = screen.getByTestId("rating");
    expect(rating.textContent).toBe(stateMock.recommendation.rating.toString());
    const reviews = screen.getByTestId("reviews");
    expect(reviews.textContent).toBe(
      stateMock.recommendation.reviews.toString()
    );
    const delivery = screen.getByTestId("delivery");
    expect(delivery.textContent).toBe(stateMock.recommendation.delivery);
    const source = container.querySelector("#source");
    expect(source).toBeDefined();
    const compare = container.querySelector("#compare");
    expect(compare).toBeDefined();
    const comparisions = container.querySelector("#comparisions");
    expect(comparisions).toBeDefined();
  });

  it("Some recommended item does not have compare, others don't have comparisions, there could be many missing", async () => {
    const { container } = render(
      <BrowserRouter>
        <RecommendationDetailPage test={true} testState={stateMock2} />
      </BrowserRouter>
    );
    const title = screen.getByTestId("title");
    expect(title.textContent).toBe(stateMock2.recommendation.title);
    const thumbnail = screen.getByTestId("thumbnail");
    expect(thumbnail.src).toBe(stateMock2.recommendation.thumbnail);
    const price = screen.getByTestId("price");
    expect(price.textContent).toBe(
      "$" + stateMock2.recommendation.extracted_price.toFixed(2)
    );
    const rating = screen.getByTestId("rating");
    expect(rating.textContent).toBe("");
    const reviews = screen.getByTestId("reviews");
    expect(reviews.textContent).toBe("");
    const delivery = screen.getByTestId("delivery");
    expect(delivery.textContent).toBe(stateMock2.recommendation.delivery);
    const source = container.querySelector("#source");
    expect(source).toBeDefined();
    const compare = container.querySelector("#compare");
    expect(compare).toBeDefined();
    const comparisions = container.querySelector("#comparisions");
    expect(comparisions).toBeNull();
  });
});
